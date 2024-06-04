import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  LayoutChangeEvent,
  View,
  Text,
  Easing,
  PanResponderGestureState,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import {
  getRandomInt,
  getAllMatches,
  markAsMatch,
  condenseColumns,
  flattenArrayToPairs,
  findMoves,
  sleep,
} from "../lib/GridApi";
import { BEAN_OBJS } from "../lib/Images";
import { TileData, TileDataType } from "../lib/TileData";
import Tile from "./Tile";
import { ROW, COLUMN } from "../lib/spec";
import ConstantsResponsive from "../../../constants/Constanst";
import { COLOR } from "../../../utils/color";
import {
  updateComponentHp,
  updateComponentTurn,
  updateHp,
} from "../../../redux/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "../../../redux/socketSlice";
import { DataSocketTransfer } from "../../../../socket";

// react-native-swipe-gestures swipeDirections type
export enum swipeDirections {
  SWIPE_UP = "SWIPE_UP",
  SWIPE_DOWN = "SWIPE_DOWN",
  SWIPE_LEFT = "SWIPE_LEFT",
  SWIPE_RIGHT = "SWIPE_RIGHT",
}

interface Props {
  setMoveCount: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}
const SwappableGrid = ({ setMoveCount, setScore }: Props) => {
  const [tileDataSource, setTileDataSource] = useState(initializeDataSource());
  const [blockScreen, setBlockScreen] = useState("");
  const gridOrigin = useRef([0, 0]);
  let invalidSwap = false;

  const config = { velocityThreshold: 0.1, directionalOffsetThreshold: 60 };

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

  const attackComponent = (tileData: TileDataType[][]) => {
    dispatch(updateComponentHp(10));

    socket?.emitEventGame({
      gameRoom: gameRoom,
      damage: 10,
      table: tileData,
    });
  };

  /** Init socket */
  useEffect(() => {
    dispatch(initSocket());
  }, []);

  /** THIS USEEFFECT HANDLE SOCKET EVENT */
  useEffect(() => {
    socket?.onListenTakeDamage((data: DataSocketTransfer) => {
      dispatch(updateComponentTurn(true));
      dispatch(updateHp(data.damage));
      setTileDataSource((state) => {
        let newTileDataSource = state.slice();
        newTileDataSource.forEach((row, indexRow) => {
          row.forEach((item, indexCol) => {
            item.imgObj = data.table[indexRow][indexCol].imgObj;
          });
        });

        return newTileDataSource;
      });
    });
  }, [socket]);

  useEffect(() => {
    // To make the animation run after the color is changed. (Image loading time varies depending on the device.)
    // Add delay to prevent color change from appearing when animation starts.
    (async function () {
      await sleep(500);
      animateValuesToLocations();
      await sleep(500);
      const nextMatches = getAllMatches(tileDataSource);
      if (nextMatches.length > 0) {
        setScore(
          (score) => score + flattenArrayToPairs(nextMatches).length * 100,
        );
        processMatches(nextMatches);
      } else {
        if (!findMoves(tileDataSource)) {
          await sleep(500);
          console.error(
            "There are no more movable tiles, so swapping any tile will reset the game.",
          );
        }
      }
    })();
  }, [tileDataSource]);

  useEffect(() => {
    if (!!blockScreen.length) {
      setTileDataSource(initializeDataSource());
    }
  }, [blockScreen]);

  const animateValuesToLocations = () => {
    tileDataSource.forEach((row, i) => {
      row.forEach((elem, j) => {
        Animated.timing(elem.location, {
          toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.85, 0, 0.15, 1),
        }).start(() => {
          if (!!blockScreen.length) {
            // 가끔 애니메이션 완료 이후에 이미지가 바뀌는 현상이 있는데 딜레이로 해결하는게 맞는가?
            // sleep(2500).then(() => setBlockScreen(''))
            setBlockScreen("");
          }
        });
      });
    });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    gridOrigin.current = [
      event.nativeEvent.layout.x,
      event.nativeEvent.layout.y,
    ];
  };

  const renderTiles = (tileData: TileDataType[][]) => {
    const tiles = tileData.map((row) =>
      row.map((e) => (
        <Tile
          location={e.location}
          scale={e.scale}
          key={e.key}
          img={e.imgObj?.image}
        />
      )),
    );

    return tiles;
  };

  const onSwipe = (
    gestureName: string,
    gestureState: PanResponderGestureState,
  ) => {
    console.error("gestureName ", gestureName);
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    let initialGestureX = gestureState.x0;
    let initialGestureY = gestureState.y0;

    let i = Math.round(
      (initialGestureX - gridOrigin.current[0] - 0.5 * TILE_WIDTH) / TILE_WIDTH,
    );

    let j = Math.round(
      (initialGestureY - gridOrigin.current[1] - 0.5 * TILE_WIDTH) / TILE_WIDTH,
    );

    console.error("i ", i, "j ", j);
    if (i > -1 && j > -1 && i < ROW && j < COLUMN) {
      switch (gestureName) {
        case SWIPE_UP:
          if (j > 0) swap(i, j, 0, -1);
          break;
        case SWIPE_DOWN:
          if (j < COLUMN - 1) swap(i, j, 0, 1);
          break;
        case SWIPE_LEFT:
          if (i > 0) swap(i, j, -1, 0);
          break;
        case SWIPE_RIGHT:
          if (i < ROW - 1) swap(i, j, 1, 0);
          break;
      }
    }
  };

  const swap = (i: number, j: number, dx: number, dy: number) => {
    const swapStarter = tileDataSource[i][j];
    const swapEnder = tileDataSource[i + dx][j + dy];
    tileDataSource[i][j] = swapEnder;
    tileDataSource[i + dx][j + dy] = swapStarter;

    const animateSwap = Animated.parallel([
      Animated.timing(swapStarter.location, {
        toValue: { x: TILE_WIDTH * (i + dx), y: TILE_WIDTH * (j + dy) },
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(swapEnder.location, {
        toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    animateSwap.start(() => {
      let allMatches = getAllMatches(tileDataSource);

      if (allMatches.length !== 0) {
        setMoveCount((moveCount) => (moveCount += 1));
        processMatches(allMatches);
        setScore(
          (score) => score + flattenArrayToPairs(allMatches).length * 100,
        );
      } else {
        if (invalidSwap) {
          invalidSwap = false;
          if (!findMoves(tileDataSource)) {
            setBlockScreen(
              "========== There are no more tiles that can be moved. ==========",
            );
          }
          return;
        }
        invalidSwap = true;
        swap(i, j, dx, dy);
      }
    });
  };

  const processMatches = (matches: number[][][]) => {
    setTileDataSource((state) => {
      let newTileDataSource = state.slice();
      markAsMatch(matches, newTileDataSource);
      condenseColumns(newTileDataSource);
      recolorMatches(newTileDataSource);

      attackComponent(newTileDataSource);
      return newTileDataSource;
    });
  };

  const recolorMatches = (tileData: TileDataType[][]) => {
    tileData.forEach((row) => {
      row.forEach((e) => {
        if (e.markedAsMatch === true) {
          let randIndex = getRandomInt(7);
          let randomBeanObj = BEAN_OBJS[randIndex];
          e.markedAsMatch = false;
          e.imgObj = randomBeanObj;
        }
      });
    });
  };

  return (
    <>
      <GestureRecognizer
        onLayout={onLayout}
        config={config}
        style={styles.gestureContainer}
        onSwipe={(direction, state) => onSwipe(direction, state)}
      >
        {renderTiles(tileDataSource)}
      </GestureRecognizer>
      {!!blockScreen.length && (
        <View style={styles.blindView}>
          <Text>{blockScreen}</Text>
        </View>
      )}
    </>
  );
};

const initializeDataSource = (): TileDataType[][] => {
  let keys = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63],
  ];
  var tileData = keys.map((row) => {
    let dataRows = row.map((key) => {
      let int = getRandomInt(7);
      let randomBeanObj = BEAN_OBJS[int];
      let data = TileData(randomBeanObj, key);
      return data;
    });
    return dataRows;
  });

  let allMatches = getAllMatches(tileData);
  // Return titleData when there are no 3 matching blocks during initial placement and the next move is possible.
  if (!allMatches.length && findMoves(tileData)) return tileData;

  return initializeDataSource();
};

export default React.memo(SwappableGrid);

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
export const TILE_WIDTH = windowSpan / 8;

let styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    width: TILE_WIDTH * ROW,
    height: TILE_WIDTH * COLUMN,
    position: "absolute",
    top: ConstantsResponsive.MAX_HEIGHT * 0.3,
  },
  blindView: {
    position: "absolute",
    width: TILE_WIDTH * ROW,
    height: TILE_WIDTH * COLUMN,
    backgroundColor: "white",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    // opacity: 0.5,
  },
});
function dispatch(arg0: { payload: any; type: "player/updateComponentHp" }) {
  throw new Error("Function not implemented.");
}
