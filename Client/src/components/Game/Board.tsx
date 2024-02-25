/**
 * @author: duy-nhan
 */
import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  PanResponder,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  PanResponderGestureState,
} from "react-native";
import { COLOR } from "../../utils/color";
import Pet from "../../../assets/Pet.png";
import Fire from "../../../assets/fire.jpg";
import LightNight from "../../../assets/lightnight.jpg";
import Shield from "../../../assets/shield.jpg";
import Sword from "../../../assets/sword.jpg";
import YinYan from "../../../assets/batquai.jpg";
import boardSlice from "../../redux/boardSlice";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import UpperLayer from "./UpperLayer";

/**
 * Size in pixel of table, please change if needed.
 */
const SIZE_TABLE = 280;

/**
 * Table in diamond game
 */
const TABLE = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
];

/**
 * This will create a brand new random element in diamond game.
 * @returns a random number
 */
const randomNumber = () => {
  return Math.floor(Math.random() * 4);
};

const GameBoard = () => {
  const INPUT_RANGE = [-1, 0, 1];
  const OUTPUT_RANGE = [COLOR.RED, COLOR.YELLOW, COLOR.RED];

  const [test, setTest] = useState(0);
  const [table, setTable] = useState([
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63],
  ]);
  /**
   * Initial state of board
   */

  const blockState = store.getState().board;

  const state = useMemo(() => {
    const rotateInterpolate = blockState.rotation.map((row: any[]) =>
      row.map((item) =>
        item.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"],
        }),
      ),
    );

    // const borderColorInterpolate = blockState.borderColor.map((row: any[]) =>
    //   row.map((item) =>
    //     item.interpolate({
    //       inputRange: [-1, 0, 1],
    //       outputRange: [Colors.win, Colors.blue, Colors.yellow],
    //     }),
    //   ),
    // );

    // const backgroundColorInterpolate = blockState.backgroundColor.map(
    //   (row: any[], i: number) =>
    //     row.map((item, j) => {
    //       if (blockState.cells[i][j].effect === WordSearchCellEffect.gift) {
    //         return item.interpolate({
    //           inputRange: [-1, 0, 1],
    //           outputRange: [Colors.win, Colors.purple, Colors.border],
    //         });
    //       } else if (
    //         blockState.cells[i][j].effect === WordSearchCellEffect.vertical
    //       ) {
    //         return item.interpolate({
    //           inputRange: [-1, 0, 1],
    //           outputRange: [Colors.win, Colors.win, Colors.border],
    //         });
    //       } else if (
    //         blockState.cells[i][j].effect === WordSearchCellEffect.horizontal
    //       ) {
    //         return item.interpolate({
    //           inputRange: [-1, 0, 1],
    //           outputRange: [Colors.win, Colors.white, Colors.border],
    //         });
    //       } else {
    //         return item.interpolate({
    //           inputRange: [-1, 0, 1],
    //           outputRange: [Colors.win, Colors.blue2, Colors.border],
    //         });
    //       }
    //     }),
    // );

    // const colorInterpolate = blockState.color.map((row, i) =>
    //   row.map((item: any, j: number) => {
    //     if (blockState.cells[i][j].effect === WordSearchCellEffect.vertical) {
    //       return item.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [Colors.btnText, Colors.constract],
    //       });
    //     } else if (
    //       blockState.cells[i][j].effect === WordSearchCellEffect.horizontal
    //     ) {
    //       return item.interpolate({
    //         inputRange: [-1, 0, 1],
    //         outputRange: [Colors.win, Colors.constract, Colors.constract],
    //       });
    //     } else {
    //       return item.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [Colors.white, Colors.constract],
    //       });
    //     }
    //   }),
    // );

    // const scoreCircleOpacityInterpolate = blockState.scoreCircleAnimation.map(
    //   (row: any[]) =>
    //     row.map((item) =>
    //       item.interpolate({
    //         inputRange: [0, 0.5, 1],
    //         outputRange: [0, 1, 0],
    //       }),
    //     ),
    // );

    // const scoreCircleScaleInterpolate = blockState.scoreCircleAnimation.map(
    //   (row: any[]) =>
    //     row.map((item) =>
    //       item.interpolate({
    //         inputRange: [0, 0.5, 1],
    //         outputRange: [0, 1, 2],
    //       }),
    //     ),
    // );

    return {
      // animation: blockState.animation,
      // scoreOpacity: blockState.scoreOpacity,
      rotation: rotateInterpolate,
      scale: blockState.scale,
      // borderColor: borderColorInterpolate,
      // backgroundColor: backgroundColorInterpolate,
      // color: colorInterpolate,
      zIndex: blockState.zIndex,
      // scoreCircle: blockState.scoreCircleAnimation,
      // scoreCircleOpacity: scoreCircleOpacityInterpolate,
      // scoreCircleScale: scoreCircleScaleInterpolate,
    };
  }, [
    blockState.rotation,
    blockState.borderColor,
    blockState.backgroundColor,
    // blockState.color,
    // blockState.animation,
    // blockState.scoreOpacity,
    blockState.scale,
    blockState.zIndex,
    blockState.cells,
    // blockState.scoreCircleAnimation,
  ]);

  const interpolation = {
    backgroundInterpolation: blockState.backgroundColor.map((row: any[]) =>
      row.map((cell) =>
        cell.interpolate({
          inputRange: INPUT_RANGE,
          outputRange: OUTPUT_RANGE,
        }),
      ),
    ),
  };

  const animatedStyles = {
    backgroundColor: interpolation.backgroundInterpolation,
  };

  /**
   * Function to handle the opacity of 1 cell position indexRow, indexCol
   * @param indexRox
   * @param indexCol
   */
  //   const startAnimation = (indexRow: number, indexCol: number) => {
  //     Animated.parallel([
  //       /**
  //        * Change opacity
  //        */
  //       Animated.timing(state.opacityAnimation[indexRow][indexCol], {
  //         toValue: 0,
  //         duration: 1500,
  //         useNativeDriver: true,
  //       }),
  //       /**
  //        * Change opacity
  //        */
  //       Animated.timing(state.backgroundAnimation[indexRow][indexCol], {
  //         toValue: 1,
  //         duration: 1500,
  //         useNativeDriver: true,
  //       }),
  //     ]).start(() =>
  //       /**
  //        * Change background
  //        */
  //       Animated.timing(state.opacityAnimation[indexRow][indexCol], {
  //         toValue: 1,
  //         duration: 1500,
  //         useNativeDriver: true,
  //       }).start(),
  //     );
  //   };

  const startAnimation = (
    row: any,
    col: any,
    numCellX: number,
    numCellY: number,
  ) => {
    // TODO: MISSING CASE WITH NEAR LINE
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
    // THIS WORK
    Animated.parallel([
      Animated.spring(blockState.coordinate[row][col], {
        toValue: {
          x: numCellX * blockState.size.WIDTH_PER_CELL + MARGIN_X * 2,
          y: numCellY * blockState.size.WIDTH_PER_CELL + MARGIN_Y * 2,
        },
        useNativeDriver: true,
      }),
      Animated.spring(blockState.coordinate[row + numCellY][col + numCellX], {
        toValue: {
          x: -numCellX * blockState.size.WIDTH_PER_CELL - MARGIN_X * 2,
          y: -numCellY * blockState.size.WIDTH_PER_CELL - MARGIN_Y * 2,
        },
        useNativeDriver: true,
      }),
    ]).start();

    onDestroyOneCell(row, col);
    // TODO FIX THIS
    // setTable((prevState: number[][]) => {
    //   const matrixCopy = prevState.map((row) => [...row]);
    //   const temp = matrixCopy[row][col];
    //   matrixCopy[row][col] = matrixCopy[row + numCellY][col + numCellX];
    //   matrixCopy[row + numCellY][col + numCellX] = temp;
    //   return { matrix: matrixCopy };
    // });

    setTest(2);
  };

  // LOG TO SEE THE UPDATE TABLE
  useEffect(() => {
    console.log("table ", table);
  }, [table]);

  /**
   * TODO Destroy 1 cell animation
   */
  const onDestroyOneCell = (row: number, col: number) => {
    console.log("Chay animation onDestroyOneCell");
    Animated.parallel([
      Animated.sequence([
        Animated.timing(blockState.backgroundColor[row][col], {
          toValue: 1,
          useNativeDriver: false,
          duration: 200,
        }),
        Animated.timing(blockState.backgroundColor[row][col], {
          toValue: 0,
          useNativeDriver: false,
          duration: 200,
          //   delay: 1000,
        }),
      ]),
      Animated.sequence([
        Animated.timing(blockState.zIndex[row][col], {
          toValue: 1000,
          useNativeDriver: false,
          duration: 0,
        }),
        Animated.timing(blockState.rotation[row][col], {
          toValue: 10,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(blockState.rotation[row][col], {
          toValue: -10,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(blockState.rotation[row][col], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(blockState.scale[row][col], {
          toValue: 2,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(blockState.scale[row][col], {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(blockState.zIndex[row][col], {
          toValue: 1,
          useNativeDriver: false,
          duration: 0,
        }),
      ]),
    ]);
  };

  /**
   * TODO Collapse animation
   */

  const selectedCells: Animated.Value[] = useMemo(() => [], [blockState]);
  let selectedIndexes: { row: number; col: number }[] = useMemo(
    () => [],
    [blockState],
  );

  const panResponder = useMemo(() => {
    let handleEndPanResponder = false;

    // Number of selected cells in x-axis
    let numCellX = 0;

    // Number of selected cells in y-axis
    let numCellY = 0;
    const onPressCell = (row: number, col: number) => {
      console.log("onPressCell " + row + " " + col);
      selectedCells.push(blockState.borderColor[row][col]);
      selectedIndexes.push({ row, col });

      // Animated.timing(blockState.borderColor[row][col], {
      //   toValue: 1,
      //   duration: 250,
      //   useNativeDriver: false,
      // }).start();
    };

    const onMoveCell = (
      gesture: PanResponderGestureState,
      index: number,
      index2: number,
    ) => {
      // console.log("onMoveCell " + index + " " + index2);
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

        // TODO Check if the user is sliding in the x-axis direction and y-axis direction
        // if (
        //   !(
        //     (index2 + numCellY ===
        //       selectedIndexes[selectedIndexes.length - 1].row + 1 &&
        //       index + numCellX ===
        //         selectedIndexes[selectedIndexes.length - 1].col) ||
        //     (index2 + numCellY ===
        //       selectedIndexes[selectedIndexes.length - 1].row - 1 &&
        //       index + numCellX ===
        //         selectedIndexes[selectedIndexes.length - 1].col) ||
        //     (index2 + numCellY ===
        //       selectedIndexes[selectedIndexes.length - 1].row &&
        //       index + numCellX ===
        //         selectedIndexes[selectedIndexes.length - 1].col + 1) ||
        //     (index2 + numCellY ===
        //       selectedIndexes[selectedIndexes.length - 1].row &&
        //       index + numCellX ===
        //         selectedIndexes[selectedIndexes.length - 1].col - 1)
        //   )
        // )
        //   return;

        // if (
        //   blockState.cells[index2 + numCellY][index + numCellX].letter === " "
        // ) {
        //   return;
        // }

        // get cell that user putting their finger
        const selectedCell =
          blockState.borderColor[index2 + numCellY][index + numCellX];

        // Colorize border of cell that the user putting their finger
        // if (!selectedCells.includes(selectedCell)) {
        //   if (blockState.effects.destroyOneCell.status) {
        //     return;
        //   }

        //   if (
        //     blockState.cells[selectedIndexes[0].row][selectedIndexes[0].col]
        //       .effect === WordSearchCellEffect.gift &&
        //     (blockState.cells[index2 + numCellY][index + numCellX].effect ===
        //       WordSearchCellEffect.gift ||
        //       selectedIndexes.length > 1)
        //   ) {
        //     return;
        //   }
        //   if (
        //     blockState.cells[index2 + numCellY][index + numCellX].effect ===
        //       WordSearchCellEffect.gift &&
        //     selectedIndexes.length > 1
        //   )
        //     return;
        //   if (
        //     selectedIndexes.length === 2 &&
        //     blockState.cells[selectedIndexes[0].row][selectedIndexes[0].col]
        //       .effect !== WordSearchCellEffect.gift &&
        //     blockState.cells[selectedIndexes[1].row][selectedIndexes[1].col]
        //       .effect === WordSearchCellEffect.gift
        //   )
        //     return;
        //   Animated.timing(selectedCell, {
        //     toValue: 1,
        //     duration: 150,
        //     useNativeDriver: false,
        //   }).start();
        //   selectedCells.push(selectedCell);
        //   // selectedIndexes.push([index2 + numCellY, index + numCellX]);

        //   selectedIndexes.push({
        //     row: index2 + numCellY,
        //     col: index + numCellX,
        //   });
        // }

        // Check if the user is rolling back
        // else if (
        //   selectedCells.indexOf(selectedCell) ==
        //   selectedCells.length - 2
        // ) {
        //   // Remove the last selected cell
        //   const lastSelectedCell = selectedCells.pop();
        //   if (lastSelectedCell) {
        //     Animated.timing(lastSelectedCell, {
        //       toValue: 0,
        //       duration: 150,
        //       useNativeDriver: false,
        //     }).start();
        //   }
        //   selectedIndexes.pop();
        // }
      }

      console.log({ numCellX });
      console.log({ numCellY });

      console.log("row ", index2 + numCellY, "col ", index + numCellX);

      // TODO DELETE THIS LATER.
      // TEST TO SET CELLS TO BLOCKLIST COLLAPSE
      blockState.blockList.push({
        startCell: { i: 0, j: 0 },
        endCell: { i: 1, j: 1 },
      });
      blockState.blockList.push({
        startCell: { i: 2, j: 2 },
        endCell: { i: 3, j: 3 },
      });

      blockState.blockList.push({
        startCell: { i: 4, j: 4 },
        endCell: { i: 5, j: 5 },
      });
    };

    const onReleaseCell = (index: number, index2: number) => {
      handleEndPanResponder = true;

      // Fill the border of selected cells back to original when finger
      //                                            is released.
      const animationList = [];

      // TODO
      // while (selectedCells.length > 0) {
      //   const selectedCell = selectedCells.pop();
      //   if (selectedCell)
      //     animationList.push(
      //       Animated.timing(selectedCell, {
      //         toValue: 0,
      //         duration: 200,
      //         useNativeDriver: false,
      //       }),
      //     );
      // }

      // dispatch({
      //   type: "SET_CHECK_ANIMATION_IN_PROGRESS",
      //   payload: {
      //     animation: true,
      //   },
      // });

      // Animated.parallel(animationList).start(({ finished }) => {
      //   if (finished) {
      //     setLetters([]);
      //     handleEndPanResponder = false;
      //     if (
      //       blockState.effects.destroyOneCell.status === null &&
      //       !explosionGift &&
      //       (!word || !blockState.words[word])
      //     ) {
      //       // if (settings.sound) {
      //       //   SoundPlayer.playSoundFile(
      //       //     SOUND_PLAYER.CONGRATULATIONS,
      //       //     "wav",
      //       //   );
      //       // }
      //       dispatch({
      //         type: "HANDLE_WRONG_WORD",
      //         payload: null,
      //       });
      //       selectedIndexes = [];
      //       return;
      //     }

      //     if (
      //       !(
      //         selectedIndexes.length === 1 &&
      //         blockState.cells[selectedIndexes[0].row][selectedIndexes[0].col]
      //           .effect === WordSearchCellEffect.gift
      //       )
      //     ) {
      //       // (1) TRIGGER ANIMATION
      //       startAnimation(selectedIndexes, 10);
      //       dispatch({
      //         type: "SET_CHECK_ANIMATION_IN_PROGRESS",
      //         payload: {
      //           word,
      //           animation: true,
      //           countDoubleAffectedCells,
      //         },
      //       });
      //     } else {
      //       dispatch({
      //         type: "SET_CHECK_ANIMATION_IN_PROGRESS",
      //         payload: {
      //           word,
      //           animation: false,
      //           countDoubleAffectedCells,
      //         },
      //       });
      //     }
      //     selectedIndexes = [];
      //   }
      // });
      console.log("onRelase numCellX ", numCellX, "numCellY", numCellY);
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
              },
            }),
          ),
      );
  }, [blockState.cells]);

  return (
    <View style={styles.boardContainer}>
      {TABLE.map((row, indexRow) => (
        <View key={indexRow} style={styles.row}>
          {row.map((cell, indexCol) => {
            let randomItem = randomNumber();
            return (
              <Animated.View
                key={indexCol}
                style={{
                  ...styles.cell,
                  backgroundColor: COLOR.YELLOW,
                  // zIndex: blockState.zIndex[indexRow][indexCol],
                  // rotation: state.rotation[indexRow][indexCol],
                  transform: [
                    { translateX: blockState.coordinate[indexRow][indexCol].x },
                    { translateY: blockState.coordinate[indexRow][indexCol].y },
                  ],
                  //   animatedStyles.backgroundColor[indexRow][indexCol],
                  // state.backgroundColor[indexRow][indexCol],
                }}
                {...panResponder[indexRow][indexCol].panHandlers}
              >
                <Image style={styles.imageInCell} source={Fire}></Image>
              </Animated.View>
            );
          })}
        </View>
      ))}
    </View>
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
