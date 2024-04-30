/**
 * @author: duy-nhan
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Candy from "../../../assets/Match3-PNG/PNG/ico/17.png";
import IceCube from "../../../assets/Match3-PNG/PNG/ico/2.png";
import Chocolate from "../../../assets/Match3-PNG/PNG/ico/20.png";
import Banana from "../../../assets/Match3-PNG/PNG/ico/6.png";
import IceCream from "../../../assets/Match3-PNG/PNG/ico/8.png";
import { DataSocketTransfer } from "../../../socket";
import {
  updateBlockList,
  updateCellsToSwap,
  updateTable,
} from "../../redux/boardSlice";
import { updateComponentTurn, updateHp } from "../../redux/playerSlice";
import { store } from "../../redux/store";
import { COLOR } from "../../utils/color";
import GameLogic, { AnimatedValues } from "../../utils/game/game";
import FinishModal from "./FinishModal";
import log from "../../logger/index.js";
import { updateMove, updateTableSocket } from "../../redux/socketSlice";

const GameBoard = () => {
  /** Redux, state and dispatch */
  const dispatch = useDispatch();
  const { socket } = useSelector((state: any) => state.socket);
  const blockState = store.getState().board;
  const blockStateTable = useSelector((state: any) => state.board.table);
  const table = useSelector((state: any) => state.board.table);
  const { hp, componentHp, isComponentTurn } = useSelector(
    (state: any) => state.player,
  );

  /** ====================================================== */
  /** useState */
  const [blockList, setBlockList] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const INPUT_RANGE = [-1, 0, 1];
  const OUTPUT_RANGE = [COLOR.RED, COLOR.YELLOW, COLOR.RED];

  /** ====================================================== */
  /** useRef */
  const cntCell = useRef(0);
  const isWinner = useRef(false);

  /**
   * Ininitial state of board
   */
  const initialState = useRef<AnimatedValues>({
    backgroundColor: GameLogic.generateAnimatedValue(-1),
    borderColor: GameLogic.generateAnimatedValue(0),
    zIndex: GameLogic.generateAnimatedValue(0),
    rotation: GameLogic.generateAnimatedValue(0),
    coordinate: GameLogic.generateAnimatedValueXY(),
    scale: GameLogic.generateAnimatedValue(0),
    scoreOpacity: GameLogic.generateAnimatedValue(1),
  });

  /** ====================================================== */
  /** useMemo */
  const boardTable = useMemo(() => {
    return table.map((row: any) => [...row]);
  }, [table]);

  /**
   * State to interpolate
   */
  const state = useMemo(() => {
    const coordinate: Animated.ValueXY[][] = initialState.current.coordinate;

    const rotateInterpolate: Animated.Value[][] =
      initialState.current.rotation.map((row: any[]) =>
        row.map((item) =>
          item.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "360deg"],
          }),
        ),
      );

    const backgroundColorInterpolate: Animated.Value[][] =
      initialState.current.backgroundColor.map((row: any[]) =>
        row.map((cell) =>
          cell.interpolate({
            inputRange: INPUT_RANGE,
            outputRange: OUTPUT_RANGE,
          }),
        ),
      );

    const scaleInterpolation: Animated.Value[][] =
      initialState.current.scale.map((row: any[]) =>
        row.map((cell) =>
          cell.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [1, 1.5, 1],
          }),
        ),
      );

    const scoreOpacity: Animated.Value[][] = initialState.current.scoreOpacity;

    return {
      scoreOpacity: scoreOpacity,
      rotation: rotateInterpolate,
      scale: scaleInterpolation,
      coordinate: coordinate,
      backgroundColor: backgroundColorInterpolate,
      zIndex: initialState.current.zIndex,
    };
  }, [
    initialState.current.rotation,
    initialState.current.borderColor,
    initialState.current.backgroundColor,
    initialState.current.scoreOpacity,
    initialState.current.scale,
    initialState.current.zIndex,
    blockStateTable,
  ]);

  /** ====================================================== */
  /** useEffect */
  useEffect(() => {
    // Reset animated value
    for (let i = 0; i < GameLogic.CELLS_IN_ROW; i++) {
      for (let j = 0; j < GameLogic.CELLS_IN_COLUMN; j++) {
        initialState.current.backgroundColor[i][j].setValue(-1);
        initialState.current.borderColor[i][j].setValue(0);
        initialState.current.zIndex[i][j].setValue(0);
        initialState.current.rotation[i][j].setValue(0);
        initialState.current.coordinate[i][j].x.setValue(0);
        initialState.current.coordinate[i][j].y.setValue(0);
        initialState.current.scale[i][j].setValue(0);
        initialState.current.scoreOpacity[i][j].setValue(1);
      }
    }
  }, [boardTable]);

  /** THIS USEEFFECT HANDLE SOCKET EVENT */
  useEffect(() => {
    if (hp <= 0 || componentHp <= 0) {
      hp <= 0 ? (isWinner.current = false) : (isWinner.current = true);
      console.log("STOP GAME");
      setIsVisible(true);
    } else {
      socket?.onListenTakeDamage((data: DataSocketTransfer) => {
        swapAnimation(
          data.move.startCell.row,
          data.move.startCell.column,
          parseInt(data.move.endCell.column) -
            parseInt(data.move.startCell.column), // numbCellX
          parseInt(data.move.endCell.row) - parseInt(data.move.startCell.row), // numbCellY
        );
        dispatch(updateComponentTurn(true));
        dispatch(updateHp(data.damage));
        // dispatch(updateTable(data.table));
        dispatch(updateTableSocket(data.table));
      });
    }
  }, [socket]);

  useEffect(() => {
    // Delay before exploding next
    const delayExecution = setTimeout(() => {
      const matchedBlocklist = checkTable(boardTable);
      if (matchedBlocklist && matchedBlocklist.length > 0) {
        setBlockList([...matchedBlocklist]);
      } else {
      }
    }, 500);
    return () => clearTimeout(delayExecution);
  }, [table]);

  useEffect(() => {
    onDestroyCells();
  }, [blockList]);

  useEffect(() => {
    socket?.onListenFirstTurn((data: any) => {
      if (socket.id == data) {
        dispatch(updateComponentTurn(false));
      } else {
        dispatch(updateComponentTurn(true));
      }
    });
  }, []);

  /** ====================================================== */
  /**
   * This function check new table to push in the new blocklist then
   * @return true false;
   *  run animation to destroy 1 cell.
   */
  const checkTable = useMemo(() => {
    return (table: any) => {
      const matchedBlockList = GameLogic.checkTable(table);
      return matchedBlockList;
    };
  }, [table]);

  /** Function to destroy cell in blocklist */
  const onDestroyCells = useMemo(() => {
    return () => {
      if (blockList && blockList.length > 0) {
        const upperBlockList = GameLogic.calcUpperBlockList(blockList);
        cntCell.current = blockList.length;
        for (let i = 0; i < cntCell.current; i++) {
          onDestroyOneCell(blockList[i], upperBlockList[i]);
        }
      }
    };
  }, [blockList]);

  /**
   * ANIMATION TO COLLAPSE UPPER LAYER
   * @param upperBlockList
   * @param blockLength Length of block
   * @param isMatchedInRows
   */
  const onCollapseUpperLayer = (
    upperBlockList: any,
    blockLength: any,
    isMatchedInRows: boolean,
  ) => {
    const startCell = upperBlockList.startCell;
    const endCell = upperBlockList.endCell;

    const cells = [];
    for (let i = startCell.i; i <= endCell.i; i++) {
      for (let j = startCell.j; j <= endCell.j; j++) {
        cells.push({ row: i, col: j });
      }
    }

    // Animation to destroy
    cells.forEach((cell) => {
      Animated.spring(initialState.current.coordinate[cell.row][cell.col], {
        toValue: {
          x: 0, // STAY IN THE x-axis
          y: isMatchedInRows
            ? GameLogic.HEIGHT_PER_CELL + GameLogic.MARGIN
            : (GameLogic.HEIGHT_PER_CELL + GameLogic.MARGIN * 2) * blockLength,
        },
        useNativeDriver: true,
        tension: 100,
      }).start(() => {
        cntCell.current--;
        if (cntCell.current == 0) {
          setBlockList([]);
          dispatch(updateBlockList(blockList));
        }
      });
    });
  };

  /**
   * ANIMATION TO DESTROY 1 CELLS
   */
  const onDestroyOneCell = (block: any, upperBlockList: any) => {
    const startCell = block.startCell;
    const endCell = block.endCell;
    let isMatchedInRows = false;
    const cells = [];
    if (startCell.i == endCell.i) {
      // IN A ROW
      isMatchedInRows = true;
      for (let cnt = startCell.j; cnt <= endCell.j; cnt++)
        cells.push({ row: startCell.i, col: cnt });
    } else {
      // IN A COLUMN
      for (let cnt = startCell.i; cnt <= endCell.i; cnt++)
        cells.push({ row: cnt, col: startCell.j });
    }

    let cellCnt = cells.length;
    // Animation to destroy
    cells.forEach((cell) => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(
            initialState.current.backgroundColor[cell.row][cell.col],
            {
              toValue: 1,
              useNativeDriver: true,
              duration: 200,
            },
          ),
          Animated.timing(
            initialState.current.backgroundColor[cell.row][cell.col],
            {
              toValue: 0,
              useNativeDriver: true,
              duration: 200,
              delay: 1000,
            },
          ),
        ]),
        Animated.sequence([
          Animated.timing(initialState.current.zIndex[cell.row][cell.col], {
            toValue: 1000,
            useNativeDriver: true,
            duration: 0,
          }),
          Animated.timing(initialState.current.rotation[cell.row][cell.col], {
            toValue: 10,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(initialState.current.rotation[cell.row][cell.col], {
            toValue: -10,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(initialState.current.rotation[cell.row][cell.col], {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(initialState.current.scale[cell.row][cell.col], {
            toValue: 2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(initialState.current.scale[cell.row][cell.col], {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(initialState.current.zIndex[cell.row][cell.col], {
            toValue: 1,
            useNativeDriver: true,
            duration: 0,
          }),
        ]),
        Animated.timing(initialState.current.scoreOpacity[cell.row][cell.col], {
          toValue: 0,
          useNativeDriver: true,
          duration: 2000,
        }),
      ]).start(() => {
        if (cellCnt > 1) cellCnt = cellCnt - 1;
        else
          onCollapseUpperLayer(upperBlockList, cells.length, isMatchedInRows);
      });
    });
  };

  // SWAP 2 CELLS AND THE PROP CORRESPONDING
  const swap2CellsAnimatedProp = (
    oldRow: any,
    oldCol: any,
    newRow: any,
    newCol: any,
  ) => {
    let temp: any;
    let prop: keyof AnimatedValues;

    for (const key of Object.keys(GameLogic.AnimationProperty)) {
      prop = GameLogic.AnimationProperty[key];
      temp = initialState.current[prop][oldRow][oldCol];
      initialState.current[prop][oldRow][oldCol] =
        initialState.current[prop][newRow][newCol];
      initialState.current[prop][newRow][newCol] = temp;
    }
  };

  /**
   * ANIMATION TO SWAP 2 CELLS.
   * @param row
   * @param col
   * @param numCellX
   * @param numCellY
   * @returns
   */
  const swapAnimation = (
    row: any,
    column: any,
    numCellX: number,
    numCellY: number,
  ) => {
    // CHECK CELL NEARE BORDER OF TABLE
    if (
      row + numCellY < 0 ||
      row + numCellY >= GameLogic.CELLS_IN_ROW ||
      column + numCellX < 0 ||
      column + numCellX >= GameLogic.CELLS_IN_COLUMN ||
      (numCellX == 0 && numCellY == 0)
    ) {
      return;
    }

    // Here is my move
    if (!isComponentTurn) {
      dispatch(
        updateMove({
          startCell: { row: row, column: column },
          endCell: { row: row + numCellY, column: column + numCellX },
        }),
      );
    }

    const { horizontalDistance, verticalDistance } =
      GameLogic.calculateDistanceToSwap(row, column, numCellX, numCellY);

    /**
     * Run animation to swap 2 cell
     */
    Animated.parallel([
      Animated.spring(initialState.current.coordinate[row][column], {
        toValue: {
          x: horizontalDistance,
          y: verticalDistance,
        },
        useNativeDriver: true,
        tension: 100,
      }),
      Animated.spring(
        initialState.current.coordinate[row + numCellY][column + numCellX],
        {
          toValue: {
            x: -horizontalDistance,
            y: -verticalDistance,
          },
          useNativeDriver: true,
          tension: 100,
        },
      ),
    ]).start(() => {
      onSwap2CellTable(row, column, row + numCellY, column + numCellX);

      const matchedBlockList = checkTable(boardTable);
      if (matchedBlockList && matchedBlockList.length > 0) {
        // UPDATE SWAP 2 CELLS
        swap2CellsAnimatedProp(row, column, row + numCellY, column + numCellX);

        setBlockList([...matchedBlockList]);

        dispatch(
          updateCellsToSwap({
            startCell: { row: row, column: column },
            endCell: { row: row + numCellY, column: column + numCellX },
          }),
        );
      } else {
        // RUN BACK THE ANIMATION
        onSwap2CellTable(row, column, row + numCellY, column + numCellX);

        Animated.parallel([
          Animated.spring(initialState.current.coordinate[row][column], {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
            tension: 100,
          }),
          Animated.spring(
            initialState.current.coordinate[row + numCellY][column + numCellX],
            {
              toValue: {
                x: 0,
                y: 0,
              },
              useNativeDriver: true,
              tension: 100,
            },
          ),
        ]).start();
      }
    });
  };

  /**
   * This function swap 2 value (oldRow, oldCol) with (newRow, newCol) in table
   * @param oldRow
   * @param oldCol
   * @param newRow
   * @param newCol
   */
  const onSwap2CellTable = (
    oldRow: any,
    oldCol: any,
    newRow: any,
    newCol: any,
  ) => {
    let temp = boardTable[oldRow][oldCol];
    boardTable[oldRow][oldCol] = boardTable[newRow][newCol];
    boardTable[newRow][newCol] = temp;
  };

  /**
   * selectedIndexes
   */
  let selectedIndexes: { row: number; col: number }[] = useMemo(
    () => [],
    [blockState],
  );

  /**
   * PAN RESPONDER TO HANDLE HAND GESTURE (SWIPING)
   */
  const panResponder = useMemo(() => {
    let handleEndPanResponder = false;

    // Number of selected cells in x-axis
    let numCellX = 0;

    // Number of selected cells in y-axis
    let numCellY = 0;

    const onPressCell = (row: number, col: number) => {
      selectedIndexes.push({ row, col });
    };

    const onMoveCell = (
      gesture: PanResponderGestureState,
      column: number,
      row: number,
    ) => {
      const width = GameLogic.WIDTH_PER_CELL;
      // Check if the user is sliding in the x-axis direction
      const xDirection = Math.abs(gesture.dx) > width / 2;
      // Check if the user is sliding in the y-axis direction
      const yDirection = Math.abs(gesture.dy) > width / 2;

      // Number of selected cells in x-axis
      numCellX = 0;

      // Number of selected cells in y-axis
      numCellY = 0;

      if (xDirection || yDirection) {
        // Number of selected cells = length of slider / width of each cell
        numCellX = Math.floor(Math.abs(gesture.dx) / width);
        numCellY = Math.floor(Math.abs(gesture.dy) / width);

        // Check the user is sliding left of right
        numCellX = gesture.dx > 0 ? numCellX : -numCellX;
        // Check the user is sliding up of down
        numCellY = gesture.dy > 0 ? numCellY : -numCellY;

        // Check if the user is sliding in the out of the board
        if (
          column + numCellY < 0 ||
          column + numCellY > GameLogic.CELLS_IN_COLUMN - 1 ||
          row + numCellX < 0 ||
          row + numCellX > GameLogic.CELLS_IN_ROW - 1
        )
          return;
      }
    };

    const onReleaseCell = (column: number, row: number) => {
      handleEndPanResponder = true;
      // numCellX, numCellY -> min: -1, max: 1
      while (numCellX < -1 || numCellX > 1) {
        numCellX =
          numCellX > 1 ? numCellX - 1 : numCellX < -1 ? numCellX + 1 : numCellX;
      }
      while (numCellY < -1 || numCellY > 1) {
        numCellY =
          numCellY > 1 ? numCellY - 1 : numCellY < -1 ? numCellY + 1 : numCellY;
      }

      // Now it's my turn to play
      dispatch(updateComponentTurn(false));

      // Let's play some animation for swap
      swapAnimation(row, column, numCellX, numCellY);
    };

    return Array(GameLogic.CELLS_IN_ROW)
      .fill(0)
      .map((_, index: number) =>
        Array(GameLogic.CELLS_IN_COLUMN)
          .fill(0)
          .map((_, index2: number) =>
            PanResponder.create({
              onStartShouldSetPanResponder: () => true,
              onStartShouldSetPanResponderCapture: (_event, _gesture) => true,
              onMoveShouldSetPanResponder: (_event, _gesture) => true,
              onMoveShouldSetPanResponderCapture: (_event, _gesture) => true,
              onPanResponderGrant: () => {
                if (handleEndPanResponder) return true;
                onPressCell(index, index2);
              },
              onPanResponderMove: (_event, gesture) => {
                if (handleEndPanResponder) return;
                onMoveCell(gesture, index2, index);
              },
              onPanResponderRelease: () => {
                if (handleEndPanResponder) return true;
                onReleaseCell(index2, index);

                handleEndPanResponder = false;
              },
            }),
          ),
      );
  }, [table]);

  /**
   * Frontend of component
   */
  return useMemo(() => {
    return (
      <View style={styles.boardContainer}>
        <FinishModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          isWinner={isWinner.current}
        />
        {boardTable.length > 0 ? (
          boardTable.map((row: any, indexRow: any) => (
            <View key={indexRow} style={styles.row}>
              {row.map((cell: any, indexCol: any) => {
                return (
                  <Animated.View
                    key={indexCol}
                    style={{
                      ...styles.cell,
                      // backgroundColor:
                      //   state.backgroundColor[indexRow][indexCol],
                      backgroundColor: "transparent",
                      zIndex: state.zIndex[indexRow][indexCol],
                      opacity: state.scoreOpacity[indexRow][indexCol],
                      transform: [
                        { scale: state.scale[indexRow][indexCol] },
                        { rotate: state.rotation[indexRow][indexCol] },
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
                    {...panResponder[indexRow][indexCol].panHandlers}
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
                );
              })}
            </View>
          ))
        ) : (
          <></>
        )}
      </View>
    );
  }, [table]);
};

const styles = StyleSheet.create({
  boardContainer: {
    height: GameLogic.TABLE_HEIGHT,
    width: GameLogic.TABLE_WIDTH,
    backgroundColor: COLOR.WHITE,
    alignContent: "center",
    top: GameLogic.POSITION_TOP,
    left: GameLogic.POSITION_LEFT,
    position: "absolute",
  },
  row: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
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

export default GameBoard;
