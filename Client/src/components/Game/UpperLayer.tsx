import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Animated,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
} from "react-native";
import { store } from "../../redux/store";
import { COLOR } from "../../utils/color";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyBlockList,
  updateCellsToSwap,
  updateDamage,
  updateTable,
  updateTurn,
} from "../../redux/boardSlice";
import GameLogic from "../../utils/game/game";
import Banana from "../../../assets/candy/6.png";
import Chocolate from "../../../assets/candy/20.png";
import Candy from "../../../assets/candy/17.png";
import IceCube from "../../../assets/candy/2.png";
import IceCream from "../../../assets/candy/8.png";
import log from "../../logger/index.js";
import { updateComponentHp } from "../../redux/playerSlice";
const UpperLayer = () => {
  /** Redux, state and dispatch */
  const dispatch = useDispatch();
  const { socket, move, tableSocket } = useSelector(
    (state: any) => state.socket,
  );
  const { gameRoom, isComponentTurn } = useSelector(
    (state: any) => state.player,
  );
  const { table, blockList, swapCells } = useSelector(
    (state: any) => state.board,
  );

  /** ====================================================== */
  /** useRef */
  const initialState = useRef({
    coordinate: GameLogic.generateAnimatedValueXY(),
  });
  const cnt = useRef(0);

  /** ====================================================== */
  /** useState */
  const [isReady, setIsReady] = useState(false);

  /** ====================================================== */
  /** useMemo  */
  const boardTable = useMemo(() => {
    return table.map((row: any) => [...row]);
  }, [table]);

  /** ====================================================== */
  /** useEffect */
  useEffect(() => {
    if (blockList && blockList.length) {
      setIsReady(true);

      // Reset Animated.Value
      for (let i = 0; i < GameLogic.CELLS_IN_ROW; i++) {
        for (let j = 0; j < GameLogic.CELLS_IN_COLUMN; j++) {
          initialState.current.coordinate[i][j].x.setValue(0);
          initialState.current.coordinate[i][j].y.setValue(0);
        }
      }
    } else setIsReady(false);
  }, [blockList]);

  useEffect(() => {
    if (isReady) {
      cnt.current = blockList.length;
      startCollapseAnimation();
    }
  }, [blockList, isReady]);

  /** ====================================================== */

  const calcDamage = useMemo<() => number>(() => {
    return () => {
      let damage = 0;
      blockList.forEach((block: Block) => {
        const value1 = boardTable[block.startCell.i][block.startCell.j];
        const value2 = boardTable[block.endCell.i][block.endCell.j];
        const value3 =
          block.startCell.i == block.endCell.i
            ? boardTable[block.startCell.i][block.startCell.j + 1]
            : boardTable[block.startCell.i + 1][block.startCell.j];
        const value = value1 == value2 || value1 == value3 ? value1 : value2;

        const times =
          block.startCell.i == block.endCell.i
            ? Math.abs(block.startCell.j - block.endCell.j) + 1
            : Math.abs(block.startCell.i - block.endCell.i) + 1;

        damage += value * times;
      });

      return damage;
    };
  }, [blockList]);

  /** THIS FUNCTION USE SOCKET TO SEND TO SERVER. */
  const attackComponent = () => {
    dispatch(updateComponentHp(10));
    socket?.emitEventGame({
      gameRoom: gameRoom,
      damage: 10,
      move: move,
      table: boardTable,
    });
  };

  /**
   * ANIMATION FOR UPPER LAYER TO COLLAPSE
   */
  const startCollapseAnimation = () => {
    if (blockList !== null && blockList.length > 0) {
      blockList.forEach((block: any) => {
        // THIS WILL STORE THE VALUE OF CELL NEED TO DROP DOWN
        const { blockHeight } = GameLogic.calculateCollapseCols(block);

        for (let i = 0; i < initialState.current.coordinate.length; i++) {
          for (let j = 0; j < initialState.current.coordinate[0].length; j++) {
            Animated.spring(initialState.current.coordinate[i][j], {
              toValue: { x: 0, y: blockHeight },
              tension: 100,
              useNativeDriver: true,
            }).start(() => {
              // THIS RUN AFTER THE ANIMATION FINISHED
              cnt.current--;
              if (cnt.current == 0) {
                if (!isComponentTurn) {
                  dispatch(updateTable(boardTable));
                } else {
                  dispatch(updateTable(tableSocket));
                }

                dispatch(updateTable(boardTable));
                dispatch(emptyBlockList([]));

                if (!isComponentTurn) {
                  attackComponent();
                }
              }
            });
          }
        }
      });
    }
  };

  /**
   * THIS GENERATE COLUMNS FOR COLLAPSE COLUMN
   * @param block
   * @returns
   */
  const generateCols = (block: Block) => {
    let startRow = block.startCell.i;
    let endRow = block.endCell.i;
    let startCol = block.startCell.j;
    let endCol = block.endCell.j;

    /** Doi 2 o sau khi swap */
    if (swapCells) {
      let temp =
        boardTable[swapCells.startCell.row][swapCells.startCell.column];
      boardTable[swapCells.startCell.row][swapCells.startCell.column] =
        boardTable[swapCells.endCell.row][swapCells.endCell.column];
      boardTable[swapCells.endCell.row][swapCells.endCell.column] = temp;
    }

    const cloneMatrix: any[] = [];

    let sliceRow = [];

    const distance = endRow - startRow + 1;

    // Tinh tien xuong
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        if (i - distance >= 0) {
          boardTable[i][j] = boardTable[i - distance][j];
        }
      }
    }

    // Set vao cho block duoc dien vao
    for (let i = 0; i <= endRow; i++) {
      sliceRow = [];
      for (let j = startCol; j <= endCol; j++) {
        let randomNumber = GameLogic.randomNumber();
        if (i - distance < 0) {
          boardTable[i][j] = randomNumber;
        }
        sliceRow.push(boardTable[i][j]);
      }

      cloneMatrix.push(sliceRow);
    }

    dispatch(updateCellsToSwap(null));
    return cloneMatrix;
  };

  return useMemo(() => {
    return blockList === null || blockList.length === 0 ? (
      <></>
    ) : (
      blockList.map((block: any, indexBlock: any) => {
        // THIS WILL STORE THE VALUE OF CELL NEED TO DROP DOWN

        const cells = generateCols(block);

        const { top, left, blockWidth, blockHeight } =
          GameLogic.calculateCollapseCols(block);

        return (
          <View
            key={indexBlock}
            style={{
              position: "absolute",
              zIndex: 5,
              top: top,
              left: left,
              height: blockHeight,
              width: blockWidth,
              overflow: "hidden",
              backgroundColor: "transparent",
              borderColor: COLOR.DARKER_PURPLE,
            }}
          >
            {/* cells in block here */}
            {cells.map((row, indexRow) => (
              <View
                key={indexRow}
                style={{
                  flexDirection: "row",
                }}
              >
                {row.map((cell: any, indexCol: any) => (
                  <Animated.View
                    key={indexCol}
                    style={{
                      top: -blockHeight, // IMPORTANT
                      margin: GameLogic.CELL_SPACING,
                      height: GameLogic.HEIGHT_PER_CELL,
                      width: GameLogic.WIDTH_PER_CELL,
                      zIndex: 99,
                      backgroundColor: COLOR.DARKER_PURPLE,
                      borderRadius: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                      transform: [
                        {
                          translateX:
                            initialState.current.coordinate[indexRow][indexCol]
                              .x,
                        },
                        {
                          translateY:
                            initialState.current.coordinate[indexRow][indexCol]
                              .y,
                        },
                      ],
                    }}
                  >
                    {cell == 0 ? (
                      <Image style={styles.cell} source={Banana} />
                    ) : cell == 1 ? (
                      <Image style={styles.cell} source={Chocolate} />
                    ) : cell == 2 ? (
                      <Image style={styles.cell} source={Candy} />
                    ) : cell == 3 ? (
                      <Image style={styles.cell} source={IceCube} />
                    ) : (
                      <Image style={styles.cell} source={IceCream} />
                    )}
                    {/* <Text>{cell}</Text> */}
                  </Animated.View>
                ))}
              </View>
            ))}
          </View>
        );
      })
    );
  }, [blockList]);
};
const styles = StyleSheet.create({
  cell: {
    height: GameLogic.SIZE_TABLE / 8,
    width: GameLogic.SIZE_TABLE / 8,
    margin: 3,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UpperLayer;
