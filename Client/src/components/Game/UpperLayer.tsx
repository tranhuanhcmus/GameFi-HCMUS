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
  updateDamage,
  updateTable,
  updateTurn,
} from "../../redux/boardSlice";
import GameLogic from "../../utils/game/game";
import Banana from "../../../assets/Match3-PNG/PNG/ico/6.png";
import Chocolate from "../../../assets/Match3-PNG/PNG/ico/20.png";
import Candy from "../../../assets/Match3-PNG/PNG/ico/17.png";
import IceCube from "../../../assets/Match3-PNG/PNG/ico/2.png";
import IceCream from "../../../assets/Match3-PNG/PNG/ico/8.png";
import log from "../../logger/index.js";
const UpperLayer = () => {
  const dispatch = useDispatch();
  const blockList = useSelector((state: any) => state.board.blockList);
  const blockState = store.getState().board;
  const { turn, damage, table } = useSelector((state: any) => state.board);
  const initialState = useRef({
    coordinate: GameLogic.generateAnimatedValueXY(),
  });
  const [isReady, setIsReady] = useState(false);

  const boardTable = useMemo(() => {
    return table.map((row: any) => [...row]);
  }, [table]);
  const cnt = useRef(0);

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

  /** Service: Generate columns to collapse */
  const generateCols = useMemo<(block: Block) => number[][]>(() => {
    return (block: Block) => {
      dispatch(updateDamage(calcDamage())); // NG

      let startRow = block.startCell.i;
      let endRow = block.endCell.i;
      let startCol = block.startCell.j;
      let endCol = block.endCell.j;

      const cloneMatrix = [];

      let sliceRow = [];
      for (let i = startRow; i <= endRow; i++) {
        sliceRow = [];
        for (let j = startCol; j <= endCol; j++) {
          if (i == block.startCell.i) {
            boardTable[i][j] = GameLogic.randomNumber();
          }
          sliceRow.push(boardTable[i][j]);
        }

        cloneMatrix.push(sliceRow);
      }
      log.error(`cloneMatrix: ${cloneMatrix}`);
      return cloneMatrix;
    };
  }, [blockList]);

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
  /**
   * ANIMATION FOR UPPER LAYER TO COLLAPSE
   */
  const startCollapseAnimation = () => {
    if (blockList !== null && blockList.length > 0) {
      blockList.forEach((block: any) => {
        // THIS WILL STORE THE VALUE OF CELL NEED TO DROP DOWN
        const { blockHeight } = GameLogic.calculateCollapseCols(block);

        // TODO
        for (let i = 0; i < initialState.current.coordinate.length; i++) {
          for (let j = 0; j < initialState.current.coordinate[0].length; j++) {
            Animated.spring(initialState.current.coordinate[i][j], {
              toValue: { x: 0, y: blockHeight },
              tension: 300,
              useNativeDriver: true,
            }).start(() => {
              // THIS RUN AFTER THE ANIMATION FINISHED
              cnt.current--;
              if (cnt.current == 0) {
                dispatch(updateTable(boardTable));
                dispatch(emptyBlockList([]));
                if (turn == 1) {
                  dispatch(updateTurn(2));
                } else if (turn == 2) {
                  dispatch(updateTurn(1));
                }
              }
            });
          }
        }
      });
    }
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
              borderColor: COLOR.PURPLE,
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
                {row.map((cell, indexCol) => (
                  <Animated.View
                    key={indexCol}
                    style={{
                      top: -blockHeight, // IMPORTANT
                      margin: GameLogic.CELL_SPACING,
                      height: GameLogic.HEIGHT_PER_CELL,
                      width: GameLogic.WIDTH_PER_CELL,
                      zIndex: 99,
                      backgroundColor: "transparent",
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
                    {boardTable[indexRow][indexCol] == 0 ? (
                      <Image style={styles.cell} source={Banana} />
                    ) : boardTable[indexRow][indexCol] == 1 ? (
                      <Image style={styles.cell} source={Chocolate} />
                    ) : boardTable[indexRow][indexCol] == 2 ? (
                      <Image style={styles.cell} source={Candy} />
                    ) : boardTable[indexRow][indexCol] == 3 ? (
                      <Image style={styles.cell} source={IceCube} />
                    ) : (
                      <Image style={styles.cell} source={IceCream} />
                    )}
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
  boardContainer: {
    height: GameLogic.SIZE_TABLE,
    width: GameLogic.SIZE_TABLE,
    backgroundColor: COLOR.WHITE,
    alignContent: "center",
  },
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
