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
  ActivityIndicator,
  FlexAlignType,
} from "react-native";
import SpriteSheet from "../../components/SpriteSheet";
import { LinearGradient } from "expo-linear-gradient";

import ConstantsResponsive from "../../constants/Constanst";
import Avatar from "../../../assets/avatar.png";
import { COLOR } from "../../utils/color";

import GameLogic, { AnimatedValues } from "../../utils/game/game";
import { HEADER } from "../../constants/header";
import { useDispatch, useSelector } from "react-redux";
import { playerSlice } from "../../redux/playerSlice";

import Setting from "../../../assets/setting.svg";
import { setVisable } from "../../redux/settingGameSlice";
import { ELEMENT, formatElement } from "../../constants/types";
import { ContraryElement } from "../../function/ContraryElement";
import { useIsFocused } from "@react-navigation/native";
import { playSound } from "../../function/SoundGame";

interface props {
  hp: number;
}
interface propsBar {
  hp: number;
  element: number;
  typleFlex: FlexAlignType;
}

const GameHeader = () => {
  const { hp, componentHp } = useSelector((state: any) => state.player);
  const dispatch = useDispatch();

  return (
    <View style={styles.characterArea}>
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
      <User hp={hp} />
      <Component hp={componentHp} />
    </View>
  );
};

// PLAYER ON THE LEFT <PLAYER 1>
const User: React.FC<props> = ({ hp }) => {
  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);
  const [fps, setFps] = useState<string>("10");
  const mummyRef = useRef<SpriteSheet>(null);
  const { assets, attributes } = useSelector((state: any) => state.petActive);

  const { atkOpponent, elementOpponent } = useSelector(
    (state: any) => state.player,
  );

  const mummyRef1 = useRef<SpriteSheet>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const isFocused = useIsFocused();
  const isFirstRender = useRef(true);
  const floatingTextAnim = useRef(new Animated.Value(0)).current;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [imageSource, setImageSource] = useState({
    uri: "",
    height: 0,
    width: 0,
  });
  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );
  useEffect(() => {
    setIsImageLoaded(false);

    Image.getSize(
      assets,
      (width, height) => {
        setImageSource({
          height: height,
          width: width,
          uri: assets,
        });
        setIsImageLoaded(true);
        play("walk");
      },
      (error) => {
        console.error("Error loading image", error);
      },
    );
  }, [assets]);

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
        onFinish: () => console.log("hi"),
      });
    }

    setLoop(true);
    setResetAfterFinish(true);
  };

  const playSkill = (type: string) => {
    const parsedFps = Number(6);

    if (mummyRef1.current) {
      mummyRef1.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
      });
    }
  };
  const stopSkill = () => {
    if (mummyRef1.current) {
      mummyRef1.current.stop(() => console.log("stopped"));
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
      playSkill("default");
      isFirstRender.current = false;
      return;
    }

    playSound(sound, "punch");

    playSkill("skill");
    setTimeout(() => {
      receiveDamage(10);
    }, 1000);
    stopSkill();
  }, [hp]);

  useEffect(() => {
    if (isFocused) {
      play("walk");
    } else {
      stop();
    }
  }, [isFocused]);

  return (
    <View style={styles.player}>
      <View style={styles.playerHeader}>
        <Image
          style={styles.avatarImage}
          source={Avatar}
          resizeMode="contain"
        ></Image>
        <Bar hp={hp} element={attributes.element} typleFlex="flex-start" />
      </View>

      <View style={styles.playerPet}>
        <View style={{ transform: [{ scaleX: -1 }] }}>
          {isImageLoaded ? (
            <SpriteSheet
              ref={mummyRef}
              source={imageSource}
              columns={60}
              height={ConstantsResponsive.YR * 2 * 80}
              rows={1}
              animations={{
                walk: Array.from({ length: 60 }, (_, i) => i),
              }}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>

        {/* Your Animated Text for displaying damage */}
        <Animated.Text style={[styles.damageText, floatingTextStyle]}>
          -
          {Math.floor(
            atkOpponent * ContraryElement(elementOpponent, attributes.element),
          )}
        </Animated.Text>
      </View>

      <View
        className="absolute bottom-0 "
        style={{
          transform: [{ translateX: offsetX }, { translateY: offsetY }],
        }}
      >
        <SpriteSheet
          ref={mummyRef1}
          source={require("../../../assets/skill.png")}
          columns={3}
          rows={3}
          width={ConstantsResponsive.XR * 2 * 80}
          animations={{
            default: [20],
            skill: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
  const [fps, setFps] = useState<string>("12");
  const mummyRef = useRef<SpriteSheet>(null);
  const mummyRef1 = useRef<SpriteSheet>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const { assets, elementOpponent } = useSelector((state: any) => state.player);
  const isFirstRender = useRef(true);
  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );
  const { attributes, atk, boostAtk } = useSelector(
    (state: any) => state.petActive,
  );

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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

    setLoop(true);
    setResetAfterFinish(true);
  };

  const playSkill = (type: string) => {
    const parsedFps = Number(6);

    if (mummyRef1.current) {
      mummyRef1.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
      });
    }
  };
  const stop = () => {
    if (mummyRef.current) {
      mummyRef.current.stop(() => console.log("stopped"));
    }
  };
  const stopSkill = () => {
    if (mummyRef1.current) {
      mummyRef1.current.stop(() => console.log("stopped"));
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

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [imageSource, setImageSource] = useState({
    uri: "",
    height: 0,
    width: 0,
  });
  useEffect(() => {
    setIsImageLoaded(false);

    Image.getSize(
      assets,
      (width, height) => {
        setImageSource({
          height: height,
          width: width,
          uri: assets,
        });

        setIsImageLoaded(true);
        play("walk");
      },
      (error) => {
        console.error("Error loading image", error);
      },
    );
  }, [assets]);

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
      playSkill("default");
      isFirstRender.current = false;
      return;
    }
    playSound(sound, "punch");
    playSkill("skill");
    setTimeout(() => {
      receiveDamage(10);
    }, 1000);
    stopSkill();
  }, [hp]);

  useEffect(() => {
    if (isFocused) {
      play("walk");
    } else {
      // Optional: stop the animation when the screen is not focused
      stop();
    }
  }, [isFocused]);

  return (
    <View style={styles.playerComponent}>
      <View style={styles.playerHeader}>
        <Bar hp={hp} element={elementOpponent} typleFlex="flex-end" />
        <Image
          style={styles.avatarImage}
          source={Avatar}
          resizeMode="contain"
        ></Image>
      </View>

      <View style={styles.playerPet}>
        {isImageLoaded ? (
          <SpriteSheet
            ref={mummyRef}
            source={imageSource}
            columns={60}
            height={ConstantsResponsive.YR * 2 * 80}
            rows={1}
            animations={{
              walk: Array.from({ length: 60 }, (_, i) => i),
            }}
          />
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        {/* Your Animated Text for displaying damage */}
        <Animated.Text style={[styles.damageText2, floatingTextStyle]}>
          -
          {Math.floor(
            atk *
              boostAtk *
              ContraryElement(attributes.element, elementOpponent),
          )}
        </Animated.Text>
      </View>

      <View
        className="absolute bottom-0 "
        style={{
          transform: [{ translateX: offsetX }, { translateY: offsetY }],
        }}
      >
        <SpriteSheet
          ref={mummyRef1}
          source={require("../../../assets/skill.png")}
          columns={3}
          rows={3}
          width={ConstantsResponsive.XR * 2 * 80}
          animations={{
            default: [20],
            skill: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          }}
        />
      </View>
    </View>
  );
};
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
//  HEALTH BAR AND DAMAGE BAR.
const Bar: React.FC<propsBar> = ({ hp, element, typleFlex }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const [hpDefaults, setHpDefaults] = useState(hp);

  useEffect(() => {
    setHpDefaults(hp);
  }, []);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: (hp / hpDefaults) * 100,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [hp]);

  // Adjust the colors and stops for your desired "glassy" look
  const barColors = ["#ff3030", "#ff8c00"];
  const colorLocations = [0, 1];

  return (
    <View
      style={{
        width: "80%",

        flexDirection: "column",
        height: 70,
        rowGap: 3,
      }}
    >
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

        <Text style={styles.barText}>{`${Math.floor(hp)}`}</Text>
      </View>
      <View style={{ width: "100%", height: "35%", alignItems: typleFlex }}>
        {ELEMENT.FIRE === formatElement(element) && (
          <Image
            resizeMode="contain"
            source={require("../../../assets/elements/fire.png")}
            style={{ width: "30%", height: "100%" }}
          />
        )}
        {ELEMENT.DARK === formatElement(element) && (
          <Image
            resizeMode="contain"
            source={require("../../../assets/elements/dark.png")}
            style={{ width: "30%", height: "100%" }}
          />
        )}
        {ELEMENT.FOREST === formatElement(element) && (
          <Image
            resizeMode="contain"
            source={require("../../../assets/elements/forest.png")}
            style={{ width: "30%", height: "100%" }}
          />
        )}
        {ELEMENT.FROZEN === formatElement(element) && (
          <Image
            resizeMode="contain"
            source={require("../../../assets/elements/frozen.png")}
            style={{ width: "30%", height: "100%" }}
          />
        )}
        {ELEMENT.THUNDER === formatElement(element) && (
          <Image
            resizeMode="contain"
            source={require("../../../assets/elements/thunder.png")}
            style={{ width: "30%", height: "100%" }}
          />
        )}
        {ELEMENT.WATER === formatElement(element) && (
          <Image
            resizeMode="contain"
            source={require("../../../assets/elements/water.png")}
            style={{ width: "30%", height: "100%" }}
          />
        )}
      </View>
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
    zIndex: 100,
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
    width: "100%",
    height: 30,
    padding: 3,
    backgroundColor: "rgba(128,128,128,0.7)",
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
