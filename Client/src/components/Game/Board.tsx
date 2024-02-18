/**
 * @author: duy-nhan
 */
import React, { useMemo } from "react";
import {
  Animated,
  PanResponder,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
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
  const INPUT_RANGE = [0, 1, 2];
  const OUTPUT_RANGE = [COLOR.RED, COLOR.YELLOW, COLOR.RED];

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

    // TODO
    //  const borderColorInterpolate = blockState.borderColor.map((row: any[]) =>
    //   row.map((item) =>
    //     item.interpolate({
    //       inputRange: [-1, 0, 1],
    //       outputRange: [COLOR.BLUE, COLOR.WHITE, COLOR.YELLOW],
    //     }),
    //   ),
    // );

    // TODO
    // const backgroundColorInterpolate = blockState.backgroundColor.map(
    //   (row: any[], i: string | number) =>
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

    // TODO
    // const colorInterpolate = blockState.color.map((row, i) =>
    //   row.map((item, j) => {
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

    // TODO
    // const scoreCircleOpacityInterpolate = blockState.scoreCircleAnimation.map(
    //   (row) =>
    //     row.map((item) =>
    //       item.interpolate({
    //         inputRange: [0, 0.5, 1],
    //         outputRange: [0, 1, 0],
    //       }),
    //     ),
    // );

    // TODO
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
      //   animation: blockState.animation, TODO
      //   scoreOpacity: blockState.scoreOpacity, TODO
      rotation: rotateInterpolate,
      scale: blockState.scale,
      //   borderColor: borderColorInterpolate, TODO
      //   backgroundColor: backgroundColorInterpolate, TODO
      //   color: colorInterpolate,
      zIndex: blockState.zIndex,
      //   scoreCircle: blockState.scoreCircleAnimation, TODO
      //   scoreCircleOpacity: scoreCircleOpacityInterpolate, TODO
      //   scoreCircleScale: scoreCircleScaleInterpolate, TODO
    };
  }, [
    blockState.rotation,
    // blockState.borderColor, TODO
    blockState.backgroundColor,
    // blockState.color, TODO
    // blockState.animation, TODO
    // blockState.scoreOpacity, TODO
    blockState.scale,
    blockState.zIndex,
    // blockState.cells,
    // blockState.scoreCircleAnimation, TODO
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
   * Handle gesture with press and then release on screen.
   */
  const panResponders = Array.from({ length: TABLE.length }, () =>
    Array.from({ length: TABLE.length }, () =>
      React.useRef(
        PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

          onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
            console.log("alooo");
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          },
        }),
      ),
    ),
  );

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

  /**
   * Destroy 1 cell animation
   */
  const onDestroyOneCell = (row: number, col: number) => {
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
          delay: 1000,
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

  return (
    <View style={styles.boardContainer}>
      {TABLE.map((row, indexRow) => (
        <View key={indexRow} style={styles.row}>
          {row.map((cell, indexCol) => {
            let randomItem = randomNumber();
            return (
              <TouchableOpacity
                key={indexCol}
                onPress={() => onDestroyOneCell(indexRow, indexCol)}
              >
                <Animated.View
                  key={indexCol}
                  style={{
                    ...styles.cell,
                    backgroundColor:
                      animatedStyles.backgroundColor[indexRow][indexCol],
                  }}
                  {...panResponders[indexRow][indexCol].current.panHandlers}
                >
                  <Image style={styles.imageInCell} source={Fire}></Image>
                </Animated.View>
              </TouchableOpacity>
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
