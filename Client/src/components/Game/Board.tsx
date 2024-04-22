/**
 * @author: duy-nhan
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  generateRandomMatrix,
  updateBlockList,
  updateCellsToSwap,
  updateTurn,
} from "../../redux/boardSlice";
import { store } from "../../redux/store";
import { COLOR } from "../../utils/color";
import GameLogic, { AnimatedValues } from "../../utils/game/game";
import { updateComponentHp, updateHp } from "../../redux/playerSlice";
import { DataSocketTransfer } from "../../../socket";
import Banana from "../../../assets/Match3-PNG/PNG/ico/6.png";
import Chocolate from "../../../assets/Match3-PNG/PNG/ico/20.png";
import Candy from "../../../assets/Match3-PNG/PNG/ico/17.png";
import IceCube from "../../../assets/Match3-PNG/PNG/ico/2.png";
import IceCream from "../../../assets/Match3-PNG/PNG/ico/8.png";
import log from "../../logger/index.js";
const GameBoard = (props: any) => {
  // Prop of component
  const { socket } = props;

  // Redux, state and dispatch
  const dispatch = useDispatch();
  const blockState = store.getState().board;
  const blockStateTable = useSelector((state: any) => state.board.table);
  const table = useSelector((state: any) => state.board.table);
  const { hp, gameRoom } = useSelector((state: any) => state.player);

  useEffect(() => {
    socket.onListenTakeDamage((data: any) => {
      dispatch(updateHp(data));
    });
  }, []);

  // useState
  const [blockList, setBlockList] = useState<any[]>([]);

  const INPUT_RANGE = [-1, 0, 1];
  const OUTPUT_RANGE = [COLOR.RED, COLOR.YELLOW, COLOR.RED];

  // useMemo
  const boardTable = useMemo(() => {
    return table.map((row: any) => [...row]);
  }, [table]);

  // useRef
  const cntCell = useRef(0);

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

  useEffect(() => {
    log.debug("This is a Debug log for GameScreen");
    log.info("This is an Info log for GameScreen");
    log.warn("This is a Warning log for GameScreen");
    log.error("This is an Error log for GameScreen");
  }, []);

  useEffect(() => {
    if (hp <= 0) {
      console.log("STOP GAME");
    } else {
      socket.onListenAttack((data: DataSocketTransfer) => {
        dispatch(updateHp(data.damage));
      });
    }
  }, []);

  useEffect(() => {
    socket.onListenMove((data: any) => {
      console.log("on Listen move", data);
      // Write logic here
      const { row, col, numCellX, numCellY } = GameLogic.calculateMove(data);

      // Show move of component on screen
      swapAnimation(row, col, numCellX, numCellY, true);
    });
  }, []);

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
        cntCell.current = blockList.length;
        blockList.forEach((item: any) => {
          onDestroyOneCell(item);
        });
      }
    };
  }, [blockList]);

  /**
   * ANIMATION TO DESTROY 1 CELLS
   */
  const onDestroyOneCell = (block: any) => {
    const startCell = block.startCell;
    const endCell = block.endCell;

    const cells = [];
    if (startCell.i == endCell.i) {
      // IN A ROW
      for (let cnt = startCell.j; cnt <= endCell.j; cnt++)
        cells.push({ row: startCell.i, col: cnt });
    } else {
      // IN A COLUMN
      for (let cnt = startCell.i; cnt <= endCell.i; cnt++)
        cells.push({ row: cnt, col: startCell.j });
    }

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
        cntCell.current--;
        if (cntCell.current == 0) {
          setBlockList([]);
          dispatch(updateBlockList(blockList));

          attackComponent();
        }
      });
    });
  };

  // THIS FUNCTION USE SOCKET TO SEND TO SERVER.
  const attackComponent = () => {
    dispatch(updateComponentHp(10));
    socket.emitEventGame({ gameRoom: gameRoom, damage: 10, move: {} });

    // socket.emitAttack({ room: "room-101", damage: 10, move: {} });
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
    col: any,
    numCellX: number,
    numCellY: number,
    isComponentTurn: boolean,
  ) => {
    // CHECK CELL NEARE BORDER OF TABLE
    if (
      row + numCellY < 0 ||
      row + numCellY >= GameLogic.CELLS_IN_ROW ||
      col + numCellX < 0 ||
      col + numCellX >= GameLogic.CELLS_IN_COLUMN ||
      (numCellX == 0 && numCellY == 0)
    ) {
      return;
    }

    const { horizontalDistance, verticalDistance } =
      GameLogic.calculateDistanceToSwap(row, col, numCellX, numCellY);

    /**
     * Run animation to swap 2 cell
     */
    Animated.parallel([
      Animated.spring(initialState.current.coordinate[row][col], {
        toValue: {
          x: horizontalDistance,
          y: verticalDistance,
        },
        useNativeDriver: true,
        tension: 100,
      }),
      Animated.spring(
        initialState.current.coordinate[row + numCellY][col + numCellX],
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
      if (!isComponentTurn) {
        socket.emitMove({
          startCell: { row: row, column: col },
          endCell: { row: row + numCellY, column: col + numCellX },
        });
      }

      onSwap2CellTable(row, col, row + numCellY, col + numCellX);

      const matchedBlockList = checkTable(boardTable);
      if (matchedBlockList && matchedBlockList.length > 0) {
        // UPDATE SWAP 2 CELLS
        swap2CellsAnimatedProp(row, col, row + numCellY, col + numCellX);

        setBlockList([...matchedBlockList]);
      } else {
        // RUN BACK THE ANIMATION
        onSwap2CellTable(row, col, row + numCellY, col + numCellX);

        Animated.parallel([
          Animated.spring(initialState.current.coordinate[row][col], {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
            tension: 100,
          }),
          Animated.spring(
            initialState.current.coordinate[row + numCellY][col + numCellX],
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

  /**
   * This function swap 2 value (oldRow, oldCol) with (newRow, newCol) in table
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
      index: number,
      index2: number,
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
          index2 + numCellY < 0 ||
          index2 + numCellY > GameLogic.CELLS_IN_COLUMN - 1 ||
          index + numCellX < 0 ||
          index + numCellX > GameLogic.CELLS_IN_ROW - 1
        )
          return;
      }
    };

    const onReleaseCell = (index: number, index2: number) => {
      handleEndPanResponder = true;

      swapAnimation(index2, index, numCellX, numCellY, false);
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
