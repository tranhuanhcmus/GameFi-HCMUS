import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import SpriteSheet from "rn-sprite-sheet";
import Pet from "../../../assets/Pet.png";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import GameLogic, { AnimatedValues } from "../../utils/game/game";
import { HEADER } from "../../constants/header";
import { useSelector } from "react-redux";
const GameHeader = () => {
  const { hp } = useSelector((state: any) => state.player);
  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);
  const [fps, setFps] = useState<string>("3");
  const mummyRef = useRef<SpriteSheet>(null);
  const mummyRef1 = useRef<SpriteSheet>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  const play = (type: string) => {
    const parsedFps = Number(fps);

    if (mummyRef.current) {
      mummyRef.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
        loop,
        resetAfterFinish,
        onFinish: () => console.log("hi"),
      });
    }
    setOffsetX(0);
    setOffsetY(0);
  };
  const play1 = (type: string) => {
    const parsedFps = Number(fps + 1);

    if (mummyRef1.current) {
      mummyRef1.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
        loop,
        resetAfterFinish,
        onFinish: () => console.log("hi"),
      });
    }
  };
  // useEffect(() => {
  //   play("walk");
  //   // const interval = setInterval(() => {
  //   //   setOffsetX((prevOffsetX) => prevOffsetX + 10); // Update offsetX every interval
  //   // }, 1000); // Change the interval as needed for desired animation speed
  // }, []);

  const stop = () => {
    if (mummyRef.current) {
      mummyRef.current.stop(() => console.log("stopped"));
    }
  };
  return (
    <View style={styles.characterArea}>
      {/* Player 1 - Left*/}
      <View style={styles.player}>
        <View style={styles.playerHeader}>
          {/* Thay anh sau */}
          <View style={styles.bar}>
            <View style={styles.energyBar}></View>
            <View style={styles.damageBar}></View>
          </View>
        </View>
        {/* <Image style={styles.petImage} source={Pet} /> */}
        <TouchableNativeFeedback
          onPress={() => {
            play1("walk"), play("walk");
          }}
        >
          <View
            style={{
              transform: [{ translateX: offsetX }, { translateY: offsetY }],
            }}
          >
            <SpriteSheet
              ref={mummyRef1}
              source={require("../../../assets/spritesheet_6.png")}
              columns={19}
              rows={1}
              height={ConstantsResponsive.YR * 150}
              width={ConstantsResponsive.XR * 150}
              animations={{
                walk: [
                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                  18,
                ],
              }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {/* Player 2 - Right */}
      <View style={styles.player}>
        <View style={styles.playerHeader}>
          {/* Thay anh sau */}
          <View style={styles.bar}>
            <View style={styles.energyBar}></View>
            <View style={styles.damageBar}></View>
          </View>
        </View>
        {/* <Image style={styles.petImage} source={Pet} /> */}
        <TouchableNativeFeedback onPress={() => play("walk")}>
          <SpriteSheet
            ref={mummyRef}
            source={require("../../../assets/spritesheet_7.png")}
            columns={19}
            rows={1}
            height={ConstantsResponsive.YR * 150}
            width={ConstantsResponsive.XR * 150}
            animations={{
              walk: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18,
              ],
            }}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => play("walk")}>
          <View
            className="absolute bottom-0 "
            style={{
              transform: [{ translateX: offsetX }, { translateY: offsetY }],
            }}
          >
            <SpriteSheet
              ref={mummyRef}
              source={require("../../../assets/skill.png")}
              columns={12}
              rows={1}
              width={ConstantsResponsive.XR * 2 * 80}
              animations={{
                walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
              }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  characterArea: {
    position: "absolute",
    top: 0,

    height: 200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  player: {
    position: "relative",
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
    borderRadius: HEADER.BORDER_RADIUS,
  },
  energyBar: {
    width: GameLogic.HEALTH_POINT,
    height: 20,
    backgroundColor: "#FF8C05",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 10,
    marginBottom: 5,
  },
  damageBar: {
    width: GameLogic.HEALTH_POINT,
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

  imageInCell: {
    width: "80%",
    height: "80%",
  },
});

export default GameHeader;
