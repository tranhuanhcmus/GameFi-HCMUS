import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import NormalButton from "../../components/Button/NormalButton";
import { useSelector } from "react-redux";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { SocketIOClient } from "../../../socket";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";
import { useAppDispatch } from "../../redux/store";
import { selectUser } from "../../redux/userSlice";

import AwesomeButton from "react-native-really-awesome-button";
import SpriteSheet from "rn-sprite-sheet";
import Damage from "../../../assets/damage.svg";
import LoadingModal from "../../components/Game/LoadingModal";
import { COLOR } from "../../utils/color";
import { setAddress } from "../../redux/userSlice";
import { useIsFocused } from "@react-navigation/native";
import Coin from "../../../assets/coin.svg";
import Inventory from "../../../assets/inventory.svg";
import ChooseGameModal from "./ChooseGameModal";
import InventoryModal from "./Inventory";
import DiamondGameBg from "../../../assets/DiamondGameBg.jpg";
import HangmanBg from "../../../assets/HangmanBg.png";

import { ItemAppOwnerService } from "../../services/ItemAppOwnerService";
type Props = {};

const HomeScreen = () => {
  /** Constant */
  const health = 60;

  /** useState */
  const [isVisible, setIsVisible] = useState(false);
  const [isChooseGameModalVisible, setIsChooseGameModalVisible] =
    useState(false);
  const [isInventoryModalVisible, setIsInventoryModalVisible] = useState(false);
  const [offsetX, setOffsetX] = useState<number>(0);
  const isFocused = useIsFocused();
  const [offsetY, setOffsetY] = useState<number>(0);
  const [gameName, setGameName] = useState<string>("");
  const [fps, setFps] = useState<string>("10");
  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);

  /** useAccount */
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  /** useSelector */
  const userState = useSelector(selectUser);

  /** useBalance */
  const { data, isError, isLoading } = useBalance({
    address: userState.address,
  });

  /** useDisconnect */
  const { disconnect } = useDisconnect(); // Add useDisconnect hook

  /** useCustomNavigation */
  const navigate = useCustomNavigation();

  /** useAppDispatch */
  const dispatch = useAppDispatch();
  const socket = SocketIOClient.getInstance();

  /** useRef */
  const mummyRef = useRef<SpriteSheet>(null);

  const play = (type: string) => {
    const parsedFps = Number(fps);

    if (mummyRef.current) {
      mummyRef.current.play({
        type,
        fps: isNaN(parsedFps) ? 20 : parsedFps,
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

  // const fetchData = async () => {
  //   try {
  //     const res: any[] = await ItemAppOwnerService.getItemAppOwner(address);
  //     console.log("fetchData res", res.data);
  //     // const mappedData: any[] = res.map((nft: any) => {
  //     //   console.log("nft ", nft);
  //     //   return {
  //     //     id: nft.tokenid,
  //     //     element: ELEMENT.FIRE,
  //     //     level: getLevel(nft.exp),
  //     //     petImg: nft.data.image || "",
  //     //     name: nft.data.name,
  //     //     rarityPet: "special",
  //     //   };
  //     // });

  //     // setData(mappedData);
  //   } catch (error) {
  //     console.error("Error fetching NFTs:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (!isConnected) {
      navigate.replace("Connect");
      dispatch(setAddress(undefined));
    } else {
      dispatch(setAddress(address));
    }
  }, [isConnected]);

  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate.replace("Connect");
  //     dispatch(setAddress(undefined));
  //   } else {
  //     dispatch(setAddress(address));
  //   }
  // }, [isConnected]);
  useEffect(() => {
    if (isFocused) {
      play("walk");
    } else {
      // Optional: stop the animation when the screen is not focused
      stop();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: COLOR.PURPLE,
        height: ConstantsResponsive.MAX_HEIGHT,
        width: ConstantsResponsive.MAX_WIDTH,
      }}
    >
      <ChooseGameModal
        setGameName={setGameName}
        isVisible={isChooseGameModalVisible}
        setIsVisible={setIsChooseGameModalVisible}
      />
      <InventoryModal
        isVisible={isInventoryModalVisible}
        setIsVisible={setIsInventoryModalVisible}
      />
      <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require("../../../assets/BackGroundHome.jpg")}
      />
      <LoadingModal
        gameName={gameName}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          justifyContent: "flex-end",
          top: ConstantsResponsive.YR * 2 * 120,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsInventoryModalVisible(true);
          }}
        >
          <Inventory
            height={ConstantsResponsive.YR * 120}
            width={ConstantsResponsive.XR * 120}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: ConstantsResponsive.YR * 120,
          marginTop: ConstantsResponsive.YR * 120,
        }}
      >
        <CustomText
          style={{
            // fontFamily: "mt-2",
            fontWeight: "bold",
            fontSize: 40,
            color: COLOR.WHITE,
          }}
        >
          LEVEL 2
        </CustomText>
        <View style={styles.healthBar}>
          <View style={[styles.healthBarInner, { width: healthBarWidth }]} />
        </View>
      </View>

      <View style={styles.playArea}>
        <View className="absolute bottom-0 left-0 right-0  flex flex-1 items-center">
          <SpriteSheet
            ref={mummyRef}
            source={require("../../../assets/spritesheet_4.png")}
            columns={8}
            rows={7}
            height={
              ConstantsResponsive.MAX_HEIGHT - ConstantsResponsive.YR * 3 * 250
            }
            animations={{
              walk: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
              ],
            }}
          ></SpriteSheet>
        </View>
      </View>
      <View
        style={{
          height: "auto",
          width: ConstantsResponsive.MAX_WIDTH,
          position: "absolute",
          bottom: ConstantsResponsive.YR * 120,
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
          paddingHorizontal: ConstantsResponsive.MAX_WIDTH * 0.03,
        }}
      >
        <NormalButton
          onPress={() => {
            setIsChooseGameModalVisible(true);
          }}
          style={styles.btnChooseGame}
          shadowColor={COLOR.BROWN}
        >
          <Image
            style={{
              position: "absolute",
              width: ConstantsResponsive.MAX_WIDTH * 0.3,
              height: ConstantsResponsive.MAX_HEIGHT * 0.09,
            }}
            resizeMode="stretch"
            source={require("../../../assets/backGroundButtonBrown.png")}
          />
          <Text style={[styles.textSizeChangGame, { color: COLOR.WHITE }]}>
            CHANGE GAME
          </Text>
        </NormalButton>

        <NormalButton
          onPress={() => {
            if (!isVisible) setIsVisible(true);

            socket.emitFindMatch(gameName);
          }}
          shadowColor={COLOR.RED_BG_BUTTON}
          style={styles.btnPlay}
        >
          <Image
            style={{
              position: "absolute",
              width: ConstantsResponsive.MAX_WIDTH * 0.6,
              height: ConstantsResponsive.MAX_HEIGHT * 0.09,
            }}
            resizeMode="stretch"
            source={require("../../../assets/backGroundButtonRed.png")}
          />
          <View
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",

              columnGap: 20,
            }}
          >
            <Image
              source={gameName === "HangManGame" ? HangmanBg : DiamondGameBg}
              style={{
                height: ConstantsResponsive.MAX_HEIGHT * 0.1 * 0.7,
                width: ConstantsResponsive.MAX_HEIGHT * 0.1 * 0.7,
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
            <Text style={styles.textSize}>Play</Text>
          </View>
        </NormalButton>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },

  btnPlay: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: ConstantsResponsive.MAX_WIDTH * 0.6,
    height: ConstantsResponsive.MAX_HEIGHT * 0.09,
  },
  btnChooseGame: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: ConstantsResponsive.MAX_WIDTH * 0.3,
    height: ConstantsResponsive.MAX_HEIGHT * 0.09,
  },
  labelButton: {
    height: ConstantsResponsive.YR * 80,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 100,
    top: -30,
  },
  textSize: {
    fontSize: ConstantsResponsive.YR * 50,
    lineHeight: ConstantsResponsive.YR * 50,
    fontWeight: "900",
    textAlign: "center",
    color: "white",
  },
  textSizeChangGame: {
    fontSize: ConstantsResponsive.YR * 20,
    lineHeight: ConstantsResponsive.YR * 20,
    fontWeight: "900",
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
    backgroundColor: COLOR.WHITE,
    borderWidth: 2,
    borderColor: COLOR.BROWN,
    borderRadius: ConstantsResponsive.YR * 10,
  },
  healthBarInner: {
    position: "absolute",
    backgroundColor: COLOR.RED_BG_BUTTON,
    left: ConstantsResponsive.XR * 3,

    top: ConstantsResponsive.YR * 3,
    bottom: ConstantsResponsive.YR * 3,
    borderRadius: ConstantsResponsive.YR * 8,
  },
  playArea: {
    width: ConstantsResponsive.MAX_WIDTH,
    position: "absolute",
    bottom: ConstantsResponsive.YR * 120 + ConstantsResponsive.YR * 120,

    height: ConstantsResponsive.MAX_HEIGHT * 0.3,
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
