import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  LayoutChangeEvent,
  PanResponderGestureState,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import { useDispatch, useSelector } from "react-redux";
import { DataSocketTransfer } from "../../../../socket";
import ConstantsResponsive from "../../../constants/Constanst";
import useCustomNavigation from "../../../hooks/useCustomNavigation";
import {
  updateComponentHp,
  updateComponentTurn,
  updateHp,
} from "../../../redux/playerSlice";
import { initSocket } from "../../../redux/socketSlice";
import StatusPopup from "../../HangManGame/StatusPopup";
import {
  condenseColumns,
  findMoves,
  flattenArrayToPairs,
  getAllMatches,
  getRandomInt,
  markAsMatch,
  sleep,
} from "../lib/GridApi";
import { BEAN_OBJS } from "../lib/Images";
import { TileData, TileDataType } from "../lib/TileData";
import { COLUMN, ROW } from "../lib/spec";
import Tile from "./Tile";
import { StatusBarHeight } from "../../../function/CalculateStatusBar";
import { playSound } from "../../../function/SoundGame";

// react-native-swipe-gestures swipeDirections type
export enum swipeDirections {
  SWIPE_UP = "SWIPE_UP",
  SWIPE_DOWN = "SWIPE_DOWN",
  SWIPE_LEFT = "SWIPE_LEFT",
  SWIPE_RIGHT = "SWIPE_RIGHT",
}

interface Props {
  socket: any;
  setMoveCount: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}
const SwappableGrid = ({ socket, setMoveCount, setScore }: Props) => {
  /** ====================================================== */
  /** useState */
  const [tileDataSource, setTileDataSource] = useState(initializeDataSource());
  const [blockScreen, setBlockScreen] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  /** ====================================================== */
  /** useRef */
  const gridOrigin = useRef([0, 0]);
  const isWinner = useRef(false);

  /** ====================================================== */
  /** variable */
  let invalidSwap = false;
  const config = { velocityThreshold: 0.001, directionalOffsetThreshold: 10 };

  /** ====================================================== */
  /** useDispatch */
  const dispatch = useDispatch();
  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );

  /** ====================================================== */
  /** useCustomNavigation */
  const navigate = useCustomNavigation();

  /** ====================================================== */
  /** useSelector */

  const { gameRoom, hp, componentHp } = useSelector(
    (state: any) => state.player,
  );
  const { turn, damage } = useSelector((state: any) => state.hangMan);

  // const attackComponent = (tileData: TileDataType[][], damage: number) => {
  //   dispatch(updateComponentHp(damage));

  //   socket?.emitEventGame({
  //     gameRoom: gameRoom,
  //     damage: damage,
  //     table: tileData,
  //   });
  // };

  const attackComponent = (tileData: TileDataType[][], damage: number) => {
    if (componentHp - damage <= 0) {
      // setStatus("Victory");
      socket.emitEventGame({
        gameRoom: gameRoom,
        damage: damage,
        table: tileData,
        event: "Defeat",
      });
    } else {
      socket.emitEventGame({
        gameRoom: gameRoom,
        damage: damage,
        table: tileData,
      });
    }
    dispatch(updateComponentHp(damage));
  };

  const handlePopupButton = () => {
    navigate.navigate("MainTab");
  };

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
    if (hp <= 0 || componentHp <= 0) {
      hp <= 0 ? (isWinner.current = false) : (isWinner.current = true);
      setIsVisible(true);
    }
  }, [hp, componentHp]);

  useEffect(() => {
    (async function () {
      await sleep(500);
      animateValuesToLocations();
      await sleep(500);
      const nextMatches = getAllMatches(tileDataSource);
      if (nextMatches.length > 0) {
        setScore((score) => score + flattenArrayToPairs(nextMatches).length);
        processMatches(nextMatches);
      } else {
        if (!findMoves(tileDataSource)) {
          await sleep(500);
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
          duration: 250,
          useNativeDriver: true,
        }).start();
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
    let tiles: React.JSX.Element[] = [];
    tileData.forEach((row, i) => {
      let rows = row.forEach((e, j) => {
        // e is a singular TileData class.
        tiles.push(
          <Tile
            location={e.location}
            scale={e.scale}
            key={e.key}
            img={e?.imgObj?.image}
          />,
        );
      });
    });
    return tiles;
  };

  const onSwipe = (
    gestureName: string,
    gestureState: PanResponderGestureState,
  ) => {
    console.error("gestureName ", gestureName);
    if (!turn) return; // COMPONENT TURN, YOU CAN NOT SWIPE

    setTimeout(() => {
      playSound(sound, "moveSound");
    }, 100);

    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    let initialGestureX = gestureState.x0;
    let initialGestureY = gestureState.y0;

    let i = Math.round(
      (initialGestureX - gridOrigin.current[0] - 0.5 * TILE_WIDTH) / TILE_WIDTH,
    );

    let j = Math.round(
      (initialGestureY - gridOrigin.current[1] - 0.5 * TILE_WIDTH) / TILE_WIDTH,
    );

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
    let newData = tileDataSource;
    const swapStarter = tileDataSource[i][j];
    const swapEnder = tileDataSource[i + dx][j + dy];
    tileDataSource[i][j] = swapEnder;
    tileDataSource[i + dx][j + dy] = swapStarter;

    const animateSwap = Animated.parallel([
      Animated.timing(swapStarter.location, {
        toValue: { x: TILE_WIDTH * (i + dx), y: TILE_WIDTH * (j + dy) },
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(swapEnder.location, {
        toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
        duration: 120,
        useNativeDriver: true,
      }),
    ]);
    setTileDataSource(newData);

    animateSwap.start(() => {
      let allMatches = getAllMatches(tileDataSource);

      if (allMatches.length != 0) {
        processMatches(allMatches);
        setScore((score) => score + flattenArrayToPairs(allMatches).length);
      }
    });
  };
  const processMatches = (matches: number[][][]) => {
    let nextMatches: string | any[] = [];
    setTimeout(() => {
      playSound(sound, "brokenSound");
    }, 100);
    setTileDataSource((state) => {
      let newTileDataSource = state.slice();
      markAsMatch(matches, newTileDataSource);
      condenseColumns(newTileDataSource);
      recolorMatches(newTileDataSource);
      if (turn) {
        attackComponent(newTileDataSource, calcAttackDamage(matches));
      }
      return newTileDataSource;
    });
    if (nextMatches.length != 0) {
      setTimeout(() => {
        processMatches(nextMatches);
      }, 250);
    }
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

  const DAM_PER_TILE = 10;
  const calcAttackDamage = (matches: number[][][]) => {
    let numTileMatched = 0;
    if (matches.length > 0) {
      matches.forEach((item) => {
        console.log("item.length ", item.length);
        numTileMatched += item.length;
      });
    }

    return DAM_PER_TILE * numTileMatched;
  };
  return (
    <>
      {isVisible ? (
        <StatusPopup
          status={isWinner.current ? "Victory" : "Defeat"}
          onPress={handlePopupButton}
        />
      ) : null}
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
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
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

  if (!allMatches.length && findMoves(tileData)) return tileData;

  return initializeDataSource();
};

export default React.memo(SwappableGrid);

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
export const TILE_WIDTH = (windowSpan * 0.8) / 6;

let styles = StyleSheet.create({
  gestureContainer: {
    width: TILE_WIDTH * ROW,
    height: TILE_WIDTH * COLUMN,

    position: "absolute",

    top: ConstantsResponsive.MAX_HEIGHT * 0.35 + StatusBarHeight,
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
