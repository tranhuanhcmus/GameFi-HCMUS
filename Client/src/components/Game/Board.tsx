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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateBlockList } from "../../redux/boardSlice";
import { store } from "../../redux/store";
import { COLOR } from "../../utils/color";

/**
 * Size in pixel of table, please change if needed.
 */
const SIZE_TABLE = 280;

/**
 * Table in diamond game
 */
const TABLE = [
  [1, 4, 3, 2, 0, 1, 3, 2],
  [2, 3, 1, 4, 0, 2, 1, 3],
  [0, 4, 1, 2, 3, 0, 2, 4],
  [3, 2, 1, 0, 4, 3, 2, 1],
  [0, 2, 4, 3, 1, 2, 3, 0],
  [1, 3, 2, 0, 4, 1, 0, 3],
  [4, 2, 3, 1, 0, 4, 2, 1],
  [3, 1, 4, 0, 2, 3, 1, 4],
];
/**
 * This will create a brand new random element in diamond game.
 * @returns a random number
 */
const randomNumber = () => {
  return Math.floor(Math.random() * 4);
};

/**
 * Function to generate 2D Matrix Animated.Value
 * @param value
 * @param CELLS_IN_ROW
 * @param CELLS_IN_COLUMN
 * @returns
 */
const generateAnimatedValue = (
  value: number,
  CELLS_IN_ROW = 8,
  CELLS_IN_COLUMN = 8,
) => {
  const animation = Array(CELLS_IN_COLUMN);
  for (let i = 0; i < CELLS_IN_COLUMN; i++) {
    animation[i] = new Array(CELLS_IN_ROW);
    for (let j = 0; j < CELLS_IN_ROW; j++) {
      animation[i][j] = new Animated.Value(value);
    }
  }
  return animation;
};

const generateAnimatedValueXY = (
  // value: number,
  CELLS_IN_ROW = 8,
  CELLS_IN_COLUMN = 8,
) => {
  const animation = Array(CELLS_IN_COLUMN);
  for (let i = 0; i < CELLS_IN_COLUMN; i++) {
    animation[i] = new Array(CELLS_IN_ROW);
    for (let j = 0; j < CELLS_IN_ROW; j++) {
      animation[i][j] = new Animated.ValueXY();
    }
  }
  return animation;
};

const GameBoard = (props: any) => {
  const { setBlockList } = props;
  const dispatch = useDispatch();
  const blockState = store.getState().board;
  const INPUT_RANGE = [-1, 0, 1];
  const OUTPUT_RANGE = [COLOR.RED, COLOR.YELLOW, COLOR.RED];
  // const blockList = useSelector((state: any) => state.board.blockList);
  const blockList = useRef<any[]>([]);
  const blockStateTable = useSelector((state: any) => state.board.table);
  const cells = useSelector((state: any) => state.board.cells);
  const [test, setTest] = useState(0);

  const table = useRef<any[]>(blockState.cells.map((row) => [...row]));
  const cntCell = useRef(0);

  useEffect(() => {
    // console.error("===============================");
    // console.error("Render the board");
  }, [blockStateTable, blockList]);
  /**
   * Ininitial state of board
   */
  const initialState = useRef({
    backgroundColor: generateAnimatedValue(-1),
    borderColor: generateAnimatedValue(0),
    zIndex: generateAnimatedValue(0),
    rotation: generateAnimatedValue(0),
    coordinate: generateAnimatedValueXY(),
    scale: generateAnimatedValue(0),
    scoreOpacity: generateAnimatedValue(1),
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

    // const scoreOpacity = generateAnimatedValue(1);
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
    blockState.cells,
    test,
    blockStateTable,
  ]);

  const checkTable = () => {
    const rows = blockState.size.CELLS_IN_ROW;
    const cols = blockState.size.CELLS_IN_COLUMN;

    // Iterate through each cell in the matrix
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current = table.current[i][j];

        // Check horizontally (to the right)
        if (
          j + 2 < cols &&
          table.current[i][j + 1] === current &&
          table.current[i][j + 2] === current
        ) {
          blockList.current.push({
            startCell: { i: i, j: j },
            endCell: { i: i, j: j + 2 },
          });
        }

        // Check vertically (below)
        if (
          i + 2 < rows &&
          table.current[i + 1][j] === current &&
          table.current[i + 2][j] === current
        ) {
          blockList.current.push({
            startCell: { i: i, j: j },
            endCell: { i: i + 2, j: j },
          });
        }
      }
    }

    console.log("blockList ", blockList);
    if (blockList && blockList.current.length > 0) {
      cntCell.current = blockList.current.length;
      blockList.current.forEach((item: any) => {
        onDestroyOneCell(item);
      });
    }
  };

  // SWAP 2 CELLS AND THE PROP CORRESPONDING
  const swap2CellsAnimatedProp = (
    oldRow: any,
    oldCol: any,
    newRow: any,
    newCol: any,
  ) => {
    let temp: any;
    // Swap 2 animated value.
    // temp = initialState.backgroundColor[oldRow][oldCol];
    // initialState.backgroundColor[oldRow][oldCol] =
    //   initialState.backgroundColor[newRow][newCol];
    // initialState.backgroundColor[newRow][newCol] = temp;

    // temp = initialState.borderColor[oldRow][oldCol];
    // initialState.borderColor[oldRow][oldCol] =
    //   initialState.borderColor[newRow][newCol];
    // initialState.borderColor[newRow][newCol] = temp;

    // temp = initialState.rotation[oldRow][oldCol];
    // initialState.rotation[oldRow][oldCol] =
    //   initialState.rotation[newRow][newCol];
    // initialState.rotation[newRow][newCol] = temp;

    // temp = initialState.scale[oldRow][oldCol];
    // initialState.scale[oldRow][oldCol] = initialState.scale[newRow][newCol];
    // initialState.scale[newRow][newCol] = temp;

    // temp = initialState.scoreOpacity[oldRow][oldCol];
    // initialState.scoreOpacity[oldRow][oldCol] =
    //   initialState.scoreOpacity[newRow][newCol];
    // initialState.scoreOpacity[newRow][newCol] = temp;
    temp = state.backgroundColor[oldRow][oldCol];
    state.backgroundColor[oldRow][oldCol] =
      state.backgroundColor[newRow][newCol];
    state.backgroundColor[newRow][newCol] = temp;

    // temp = state.borderColor[oldRow][oldCol];
    // state.borderColor[oldRow][oldCol] =
    // state.borderColor[newRow][newCol];
    // state.borderColor[newRow][newCol] = temp;

    temp = state.rotation[oldRow][oldCol];
    state.rotation[oldRow][oldCol] = state.rotation[newRow][newCol];
    state.rotation[newRow][newCol] = temp;

    temp = state.scale[oldRow][oldCol];
    state.scale[oldRow][oldCol] = state.scale[newRow][newCol];
    state.scale[newRow][newCol] = temp;

    temp = state.scoreOpacity[oldRow][oldCol];
    state.scoreOpacity[oldRow][oldCol] = state.scoreOpacity[newRow][newCol];
    state.scoreOpacity[newRow][newCol] = temp;
  };

  /**
   * ANIMATION TO SWAP 2 CELLS.
   * @param row
   * @param col
   * @param numCellX
   * @param numCellY
   * @returns
   */
  const startAnimation = (
    row: any,
    col: any,
    numCellX: number,
    numCellY: number,
  ) => {
    // CHECK CELL NEARE BORDER OF TABLE
    if (
      row + numCellY < 0 ||
      row + numCellY >= blockState.size.CELLS_IN_ROW ||
      col + numCellX < 0 ||
      col + numCellX >= blockState.size.CELLS_IN_COL ||
      (numCellX == 0 && numCellY == 0)
    ) {
      return;
    }

    // EXTRA MARGIN ON CELL ON X_AXIS
    const MARGIN_X =
      numCellX > 0
        ? blockState.size.MARGIN
        : numCellX < 0
          ? -blockState.size.MARGIN
          : 0;

    // EXTRA MARGIN ON CELL ON Y_AXIS
    const MARGIN_Y =
      numCellY > 0
        ? blockState.size.MARGIN
        : numCellY < 0
          ? -blockState.size.MARGIN
          : 0;

    Animated.parallel([
      Animated.spring(initialState.current.coordinate[row][col], {
        toValue: {
          x: numCellX * blockState.size.WIDTH_PER_CELL + MARGIN_X * 2,
          y: numCellY * blockState.size.WIDTH_PER_CELL + MARGIN_Y * 2,
        },
        useNativeDriver: true,
      }),
      Animated.spring(
        initialState.current.coordinate[row + numCellY][col + numCellX],
        {
          toValue: {
            x: -numCellX * blockState.size.WIDTH_PER_CELL - MARGIN_X * 2,
            y: -numCellY * blockState.size.WIDTH_PER_CELL - MARGIN_Y * 2,
          },
          useNativeDriver: true,
        },
      ),
    ]).start();

    // swap2CellsAnimatedProp(row, col, row + numCellY, col + numCellX);

    let temp = table.current[row][col];
    table.current[row][col] = table.current[row + numCellY][col + numCellX];
    table.current[row + numCellY][col + numCellX] = temp;

    swap2CellsAnimatedProp(row, col, row + numCellY, col + numCellX);

    checkTable();
  };

  /**
   * ANIMATION TO DESTROY 1 CELLS
   */
  const onDestroyOneCell = useMemo<(block: any) => void>(() => {
    return (block: any) => {
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
          Animated.timing(
            initialState.current.scoreOpacity[cell.row][cell.col],
            {
              toValue: 0,
              useNativeDriver: true,
              duration: 2000,
            },
          ),
        ]).start(() => {
          cntCell.current--;
          if (cntCell.current == 0) {
            dispatch(updateBlockList(blockList.current));
          }
        });
      });
    };
  }, []);

  /**
   * TODO Collapse animation
   */
  const selectedCells: Animated.Value[] = useMemo(() => [], [blockState]);
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
      const width = blockState.size.WIDTH_PER_CELL;
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
          index2 + numCellY > blockState.size.CELLS_IN_COLUMN - 1 ||
          index + numCellX < 0 ||
          index + numCellX > blockState.size.CELLS_IN_ROW - 1
        )
          return;
      }
    };

    const onReleaseCell = (index: number, index2: number) => {
      handleEndPanResponder = true;

      startAnimation(index2, index, numCellX, numCellY);
    };

    return Array(blockState.size.CELLS_IN_ROW)
      .fill(0)
      .map((_, index: number) =>
        Array(blockState.size.CELLS_IN_COLUMN)
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
  }, [test]);

  return useMemo(
    () => (
      <View style={styles.boardContainer}>
        {blockState.table.length > 0 ? (
          blockState.table.map((row: any, indexRow: any) => (
            <View key={indexRow} style={styles.row}>
              {row.map((cell: any, indexCol: any) => {
                let randomItem = randomNumber();
                return (
                  <Animated.View
                    key={indexCol}
                    style={{
                      ...styles.cell,
                      backgroundColor:
                        state.backgroundColor[indexRow][indexCol],
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
                      <Text>0</Text>
                    ) : cell == 1 ? (
                      <Text>1</Text>
                    ) : cell == 2 ? (
                      <Text>2</Text>
                    ) : cell == 3 ? (
                      <Text>3</Text>
                    ) : (
                      <Text>4</Text>
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
    ),
    [blockStateTable, blockList],
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.PURPLE,
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  characterArea: {
    height: 200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  player: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  petImage: {
    width: 100,
    height: 100,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  energyBar: {
    width: 80,
    height: 20,
    backgroundColor: "#FF8C05",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 10,
    marginBottom: 5,
  },
  damageBar: {
    width: 80,
    height: 20,
    backgroundColor: "#70A2FF",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 4,
  },
  bar: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
  },
  playerHeader: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  boardContainer: {
    height: "auto",
    width: "auto",
    backgroundColor: COLOR.WHITE,
    alignContent: "center",
    top: 100, // HERE IS THE BLOCKSTATE POSITION TOP (SLICE)
    left: 15, // HERE IS THE BLOCKSTATE POSITION LEFT (SLICE)
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
    height: SIZE_TABLE / 8,
    width: SIZE_TABLE / 8,
    margin: 3,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imageInCell: {
    width: "80%",
    height: "80%",
  },
});

export default GameBoard;
