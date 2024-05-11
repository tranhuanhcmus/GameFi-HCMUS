import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Image,
  TextInput,
  Switch,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import GradientButton from "../../components/Button/GradientButton";
import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";
import { useAppDispatch } from "../../redux/store";
import { selectUser, setAddress } from "../../redux/userSlice";
import SVGPlay from "../../../assets/SVGPlay.svg";
import { useSelector } from "react-redux";
import PetCarousel from "../../components/Pets/PetCarousel";
import { SocketIOClient } from "../../../socket";

import NormalButton from "../../components/Button/NormalButton";
import SpriteSheet from "rn-sprite-sheet";
import AwesomeButton from "react-native-really-awesome-button";
import { COLOR } from "../../utils/color";
import LoadingModal from "../../components/Game/LoadingModal";
type Props = {};

const HomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const userState = useSelector(selectUser);
  const health = 60;

  const { data, isError, isLoading } = useBalance({
    address: userState.address,
  });
  const { disconnect } = useDisconnect(); // Add useDisconnect hook
  const navigate = useCustomNavigation();
  const dispatch = useAppDispatch();
  const socket = SocketIOClient.getInstance();

  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);
  const [fps, setFps] = useState<string>("2");
  const mummyRef = useRef<SpriteSheet>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [gameName, setGameName] = useState<string>("");

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
    setLoop(true);
    setResetAfterFinish(true);
  };
  let healthBarWidth =
    ((ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 200 -
      ConstantsResponsive.XR * 60 -
      ConstantsResponsive.XR * 6) *
      health) /
    100;
  const stop = () => {
    if (mummyRef.current) {
      mummyRef.current.stop(() => console.log("stopped"));
    }
  };
  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate.replace("Connect");
  //     dispatch(setAddress(undefined));
  //   } else {
  //     dispatch(setAddress(address));
  //   }
  // }, [isConnected]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setOffsetX((prevOffsetX) => prevOffsetX + 50); // Update offsetX every interval
  //   }, 1000); // Change the interval as needed for desired animation speed
  // }, []);

  return (
    <View className=" relative  flex-1 flex-col items-center">
      <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require("../../../assets/BackGround.png")}
      />
      <LoadingModal
        gameName={gameName}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <View
        className="mt-20 flex w-full flex-row justify-center "
        style={{ marginTop: ConstantsResponsive.YR * 120 }}
      >
        <SVGPlay width={40} height={40} />
        <SVGPlay width={40} height={40} />
        <SVGPlay width={40} height={40} />
      </View>
      <View className="flex flex-col items-center">
        <View style={styles.healthBar}>
          <View style={[styles.healthBarInner, { width: healthBarWidth }]} />
        </View>
        <CustomText className="mt-2 font-rexlia text-4xl text-[#b15555]">
          Level 6
        </CustomText>
      </View>

      <View style={styles.playArea} className="relative  ">
        <View className="absolute bottom-0 left-0 right-0  flex flex-1 items-center">
          <TouchableNativeFeedback onPress={() => play("walk")}>
            <View
              style={{
                transform: [{ translateX: offsetX }, { translateY: offsetY }],
                marginBottom: ConstantsResponsive.YR * 30,
              }}
            >
              <SpriteSheet
                ref={mummyRef}
                source={require("../../../assets/spritesheet_5.png")}
                columns={21}
                rows={1}
                height={
                  ConstantsResponsive.MAX_HEIGHT -
                  ConstantsResponsive.YR * 3 * 250
                }
                animations={{
                  walk: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20,
                  ],
                }}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      <View
        className=" flex flex-row  justify-between"
        style={styles.labelButton}
      >
        <AwesomeButton
          onPress={() => {
            if (!isVisible) setIsVisible(true);
            setGameName("HangManGame");
            socket.emitFindMatch("HangManGame");
          }}
          backgroundDarker={COLOR.DARK_YELLOW}
          backgroundColor={COLOR.BRIGHT_YELLOW}
          width={150}
          height={60}
          borderRadius={15}
        >
          <Text style={styles.textSize}>HangMan</Text>
        </AwesomeButton>

        <AwesomeButton
          onPress={() => {
            if (!isVisible) setIsVisible(true);
            setGameName("Game");
            socket.emitFindMatch("Game");
          }}
          backgroundDarker={COLOR.DARK_YELLOW}
          backgroundColor={COLOR.BRIGHT_YELLOW}
          width={150}
          height={60}
          borderRadius={15}
        >
          <Text style={styles.textSize}>Normal play</Text>
        </AwesomeButton>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },
  labelButton: {
    height: ConstantsResponsive.YR * 80,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 100,
    top: -30,
  },
  textSize: {
    fontSize: ConstantsResponsive.YR * 20,
    lineHeight: ConstantsResponsive.YR * 20,
    fontWeight: "bold",
    color: COLOR.BLACK,
    textAlign: "center",
  },

  topPanel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: ConstantsResponsive.YR * 250,
    flexDirection: "column",
  },
  statsContainer: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.YR * 120,
    flexDirection: "row",
  },
  stats: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseButton: {
    width: ConstantsResponsive.YR * 50,
    height: ConstantsResponsive.YR * 50,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  pauseButtonIcon: {
    width: ConstantsResponsive.YR * 25,
    height: ConstantsResponsive.YR * 25,
  },
  levelContainer: {
    width: ConstantsResponsive.YR * 80,
    height: ConstantsResponsive.YR * 80,
    backgroundColor: "#ff1a1a",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  levelTitle: {
    fontSize: 21,
    color: "white",
    fontFamily: "LilitaOne",
  },
  levelNumber: {
    fontSize: 17,
    color: "white",
    fontFamily: "LilitaOne",
  },
  scoreIcon: {
    position: "absolute",
    left: 0,
    width: ConstantsResponsive.YR * 40,
    height: ConstantsResponsive.YR * 40,
  },
  scoreBar: {
    height: ConstantsResponsive.YR * 25,
    position: "absolute",
    left: 20,
    right: 5,
    backgroundColor: "white",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: 17,
    color: "black",
    fontFamily: "LilitaOne",
  },
  timeIcon: {
    position: "absolute",
    left: 0,
    width: ConstantsResponsive.YR * 40,
    height: ConstantsResponsive.YR * 40,
  },
  timeBar: {
    height: ConstantsResponsive.YR * 25,
    position: "absolute",
    left: 20,
    right: 5,
    backgroundColor: "white",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  timeNumber: {
    fontSize: 17,
    color: "black",
    fontFamily: "LilitaOne",
  },
  healthBarContainer: {
    height: ConstantsResponsive.YR * 40,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 120,
    marginLeft: ConstantsResponsive.XR * 60,
  },
  healthIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: ConstantsResponsive.YR * 46,
    height: ConstantsResponsive.YR * 40,
  },
  healthBar: {
    height: ConstantsResponsive.YR * 20,
    width:
      ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 200 -
      ConstantsResponsive.XR * 60,
    marginLeft: ConstantsResponsive.XR * 40,
    marginTop: ConstantsResponsive.YR * 10,
    backgroundColor: "white",
    borderRadius: ConstantsResponsive.YR * 10,
  },
  healthBarInner: {
    position: "absolute",
    backgroundColor: "#ff1a1a",
    left: ConstantsResponsive.XR * 3,

    top: ConstantsResponsive.YR * 3,
    bottom: ConstantsResponsive.YR * 3,
    borderRadius: ConstantsResponsive.YR * 8,
  },
  playArea: {
    width: ConstantsResponsive.MAX_WIDTH,

    height:
      ConstantsResponsive.MAX_HEIGHT -
      ConstantsResponsive.YR * 250 -
      ConstantsResponsive.YR * 112 -
      ConstantsResponsive.YR * 112,
    flexDirection: "column",
  },
  playRow: {
    height:
      (ConstantsResponsive.MAX_HEIGHT -
        ConstantsResponsive.YR * 250 -
        ConstantsResponsive.YR * 112) /
      4,
    width: ConstantsResponsive.MAX_WIDTH,
    flexDirection: "row",
  },
  playCell: {
    width: ConstantsResponsive.MAX_WIDTH / 3,
    height:
      (ConstantsResponsive.MAX_HEIGHT -
        ConstantsResponsive.YR * 250 -
        ConstantsResponsive.YR * 112) /
      4,
    alignItems: "center",
  },
});
