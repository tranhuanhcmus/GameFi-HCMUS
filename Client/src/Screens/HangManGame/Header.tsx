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
import { LinearGradient } from "expo-linear-gradient";

import ConstantsResponsive from "../../constants/Constanst";
import Avatar from "../../../assets/avatar.png";
import { COLOR } from "../../utils/color";

import GameLogic, { AnimatedValues } from "../../utils/game/game";
import { HEADER } from "../../constants/header";
import { useDispatch, useSelector } from "react-redux";
import { playerSlice } from "../../redux/playerSlice";

import Setting from "../../../assets/SVGSetting.svg";
import { setVisable } from "../../redux/settingGameSlice";

interface props {
  hp: number;
}

const GameHeader = () => {
  const { hp, componentHp } = useSelector((state: any) => state.player);
  return (
    <View style={styles.characterArea}>
      <User hp={hp} />
      <Component hp={componentHp} />
    </View>
  );
};

// PLAYER ON THE LEFT <PLAYER 1>
const User: React.FC<props> = ({ hp }) => {
  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);
  const [fps, setFps] = useState<string>("3");
  const mummyRef = useRef<SpriteSheet>(null);
  const mummyRef1 = useRef<SpriteSheet>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const isFirstRender = useRef(true);
  const floatingTextAnim = useRef(new Animated.Value(0)).current;

  // Call this function when the character receives damage
  const receiveDamage = (damageAmount: number) => {
    // Trigger other damage effects like red flash or shake if you have

    // Start animation for floating damage text
    floatingTextAnim.setValue(0); // Reset animation
    Animated.sequence([
      Animated.timing(floatingTextAnim, {
        toValue: 1,
        duration: 1000, // The duration can be adjusted
        useNativeDriver: true,
      }),
    ]).start();
  };

  // ...rest of the component...

  // Floating text style that will animate
  const floatingTextStyle = {
    transform: [
      {
        translateY: floatingTextAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50], // starts at 0 and ends at -50 on y-axis. Adjust if needed.
        }),
      },
    ],
    opacity: floatingTextAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0], // Starts from transparent, becomes solid, then fades
    }),
  };

  const play = (type: string) => {
    const parsedFps = Number(fps);

    if (mummyRef.current) {
      mummyRef.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
        loop,
        resetAfterFinish,
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
      });
    }
  };

  const stop = () => {
    if (mummyRef.current) {
      mummyRef.current.stop(() => console.log("stopped"));
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the effect on first render
      play("default");
      isFirstRender.current = false;
      return;
    }

    play("walk");
    setTimeout(() => {
      receiveDamage(10);
    }, 1000);
  }, [hp]);

  return (
    <View style={styles.player}>
      <View style={styles.playerHeader}>
        <Image
          style={styles.avatarImage}
          source={Avatar}
          resizeMode="contain"
        ></Image>
        <Bar hp={hp} />
      </View>

      <View style={styles.playerPet}>
        <View style={{ transform: [{ scaleX: -1 }] }}>
          <SpriteSheet
            ref={mummyRef1}
            source={require("../../../assets/spritesSheet_18.png")}
            columns={60}
            rows={1}
            height={ConstantsResponsive.YR * 250}
            width={ConstantsResponsive.XR * 250}
            animations={{
              walk: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
              ],
            }}
          />
        </View>

        {/* Your Animated Text for displaying damage */}
        <Animated.Text style={[styles.damageText, floatingTextStyle]}>
          -10
        </Animated.Text>
      </View>

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
            default: [20],
            walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          }}
        />
      </View>
    </View>
  );
};

// PLAYER ON THE RIGHT <PLAYER 2>
const Component: React.FC<props> = ({ hp }) => {
  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);
  const [fps, setFps] = useState<string>("3");
  const mummyRef = useRef<SpriteSheet>(null);
  const mummyRef1 = useRef<SpriteSheet>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();

  const play = (type: string) => {
    const parsedFps = Number(fps);

    if (mummyRef.current) {
      mummyRef.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
        loop,
        resetAfterFinish,
      });
    }
  };
  const play1 = (type: string) => {
    const parsedFps = Number(fps + 1);

    if (mummyRef1.current) {
      mummyRef1.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
        loop,
        resetAfterFinish,
      });
    }
  };

  const floatingTextAnim = useRef(new Animated.Value(0)).current;
  const floatingTextStyle = {
    transform: [
      {
        translateY: floatingTextAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50], // starts at 0 and ends at -50 on y-axis. Adjust if needed.
        }),
      },
    ],
    opacity: floatingTextAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0], // Starts from transparent, becomes solid, then fades
    }),
  };

  // Call this function when the character receives damage
  const receiveDamage = (damageAmount: number) => {
    // Trigger other damage effects like red flash or shake if you have

    // Start animation for floating damage text
    floatingTextAnim.setValue(0); // Reset animation
    Animated.sequence([
      Animated.timing(floatingTextAnim, {
        toValue: 1,
        duration: 1000, // The duration can be adjusted
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the effect on first render
      play("default");
      isFirstRender.current = false;
      return;
    }

    play("walk");
    setTimeout(() => {
      receiveDamage(10);
    }, 1000);
  }, [hp]);

  return (
    <View style={styles.playerComponent}>
      <View style={styles.playerHeader}>
        <Bar hp={hp} />
        <Image
          style={styles.avatarImage}
          source={Avatar}
          resizeMode="contain"
        ></Image>
      </View>
      <TouchableOpacity
        style={styles.setting}
        onPress={() => {
          dispatch(setVisable(true));
        }}
      >
        <Setting
          height={styles.setting.height}
          width={styles.setting.width}
        ></Setting>
      </TouchableOpacity>

      <View style={styles.playerPet}>
        <SpriteSheet
          ref={mummyRef1}
          source={require("../../../assets/spritesSheet_18.png")}
          columns={60}
          rows={1}
          height={ConstantsResponsive.YR * 250}
          width={ConstantsResponsive.XR * 250}
          animations={{
            walk: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
              35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
              51, 52, 53, 54, 55, 56, 57, 58, 59,
            ],
          }}
        />
        {/* Your Animated Text for displaying damage */}
        <Animated.Text style={[styles.damageText2, floatingTextStyle]}>
          -10
        </Animated.Text>
      </View>

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
            default: [20],
            walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          }}
        />
      </View>
    </View>
  );
};
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
//  HEALTH BAR AND DAMAGE BAR.
const Bar: React.FC<props> = ({ hp }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: (hp / GameLogic.HEALTH_POINT) * 100,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [hp]);

  // Adjust the colors and stops for your desired "glassy" look
  const barColors = ["#ff3030", "#ff8c00"];
  const colorLocations = [0, 1];

  return (
    <View style={styles.barContainer}>
      <AnimatedGradient
        style={[
          styles.healthBar,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={barColors}
        locations={colorLocations}
      ></AnimatedGradient>

      <Text style={styles.barText}>{`${hp}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  characterArea: {
    height: "100%",

    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  damageText: {
    color: "red",
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    // You may need to adjust these values to position the damage text correctly
    bottom: 50,
    right: 0,
  },
  damageText2: {
    color: "red",
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    // You may need to adjust these values to position the damage text correctly
    bottom: 50,
    left: 0,
  },

  player: {
    width: "40%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  playerComponent: {
    width: "40%",

    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  playerHeader: {
    height: "30%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  setting: {
    position: "absolute",
    height: ConstantsResponsive.XR * 50,
    width: ConstantsResponsive.XR * 50,
    top: ConstantsResponsive.YR * 80,
    right: ConstantsResponsive.XR * 4,
  },

  playerPet: {
    display: "flex",
    height: "70%",

    flexDirection: "column",
    justifyContent: "center",
  },

  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 1,
  },
  energyBar: {
    width: GameLogic.HEALTH_POINT,
    height: 20,
    backgroundColor: "transparent",
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

  barContainer: {
    width: "60%",
    height: 30,
    padding: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 15,
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  healthBar: {
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    position: "absolute",
    left: 3,
    top: 3,
    bottom: 3,
  },

  barText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GameHeader;
