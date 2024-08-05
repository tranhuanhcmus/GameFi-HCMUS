import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Image,
  TextInput,
  Switch,
  Modal,
  Animated,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { COLOR } from "../../utils/color";
import { SocketIOClient } from "../../../socket";

import ConstantsResponsive from "../../constants/Constanst";
import AwesomeButton from "react-native-really-awesome-button";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";
import {
  setAssets,
  setComponentHp,
  setGameRoom,
  setOpponentValue,
  updateComponentHp,
} from "../../redux/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import BouncingText from "../BouncingText";

import profile from "../../../assets/avatar.png";
import { Ionicons } from "@expo/vector-icons";
import NormalButton from "../Button/NormalButton";
import { UsersService } from "../../services/UsersService";
import { GAMETYPE } from "../../constants/types";
import { useAccount } from "wagmi";

const LoadingModal = ({
  isVisible,
  setIsVisible,
  gameName,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  gameName: string;
}) => {
  const navigate = useCustomNavigation();
  const socket = SocketIOClient.getInstance();

  const { tokenId } = useSelector((state: any) => state.petActive);

  const [second, setSecond] = useState(30);
  const dispatch = useDispatch();

  /** useAccount */
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  // THIS HOOK COUNT DOWN BEFORE GAME

  useEffect(() => {
    if (isVisible) {
      const intervalId = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 0) {
            clearInterval(intervalId); // Stop the interval
            return prevSecond;
          } else {
            return prevSecond - 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  const PlayGame = async () => {
    try {
      const body = { tokenId: tokenId };
      const res = await UsersService.playGame(address as `0x${string}`, body);
    } catch (err) {
      console.log(err);
    }
  };

  //   THIS HOOK NAVIGATE TO GAME WHEN SECOND IS 0
  useEffect(() => {
    if (second == 0) {
      setIsVisible(false);
      setSecond(30);
      socket.emitSuccess("");
    }
  }, [second]);

  if (isVisible) {
    socket.connect();
    socket.onListenKeyRoom((data) => {
      setIsVisible(false);
      if (data.gameRoom !== "NO ROOM") {
        PlayGame();
        dispatch(setGameRoom(data.gameRoom));
        dispatch(
          setOpponentValue({
            hpOpponent: data.hpOpponent,
            assetsOpponent: data.assetsOpponent,
            elementOpponent: data.elementOpponent,
            atkOpponent: data.atkOpponent,
          }),
        );

        if (gameName == GAMETYPE.DIAMONDPUZZLE) {
          navigate.navigate("Match3Game");
        } else if (gameName == GAMETYPE.WORDMASTER) {
          navigate.navigate("HangManGame");
        }
      }
    });
  }

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          source={require("../../../assets/backGroundForInventory.png")}
          style={{
            position: "absolute",
            width: ConstantsResponsive.MAX_WIDTH,
            height: ConstantsResponsive.MAX_HEIGHT,
          }}
        />
        <SafeAreaView style={styles.containerContent}>
          <View className="absolute top-5">
            <Text className="text-2xl font-bold text-white">{gameName}</Text>
          </View>
          <View style={styles.containerProfile}>
            <View style={styles.playerBlock}>
              <Image source={profile} style={styles.avatar} />
              <Text style={styles.name}>You</Text>
            </View>
            <View style={styles.vsBlock}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            <View style={styles.playerBlock}>
              <Image source={profile} style={styles.avatar} />
              <BouncingText text="Finding Opponent..." />
              {/* <Text style={styles.name}>Opponent</Text> */}
            </View>
          </View>

          <NormalButton
            onPress={() => {
              setIsVisible(false);
              setSecond(30);
              socket.emitSuccess("");
            }}
            style={{
              position: "absolute",
              bottom: 20,
              height: ConstantsResponsive.YR * 70,
              width: ConstantsResponsive.MAX_WIDTH * 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="stretch"
              source={require("../../../assets/backGroundButtonRed.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            />
            <Text className="font-bold text-white ">Cancel</Text>
          </NormalButton>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.DARKER_PURPLE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  containerContent: {
    width: "100%",
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerProfile: {
    height: "40%",
    position: "relative",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    rowGap: ConstantsResponsive.YR * 15,
  },
  playerBlock: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    padding: 20,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 80,
    height: "50%",
    backgroundColor: "rgba(125,125,125,0.8)",
    alignItems: "center",
  },
  avatar: {
    width: ConstantsResponsive.XR * 100,
    height: ConstantsResponsive.XR * 100,
    borderRadius: 1000,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
  },
  vsBlock: {
    position: "absolute",
    backgroundColor: "#FECC50",
    width: ConstantsResponsive.XR * 100,
    height: ConstantsResponsive.YR * 70,
    zIndex: 100,
    top:
      (ConstantsResponsive.MAX_HEIGHT * 0.4 - ConstantsResponsive.YR * 30) / 2 -
      (ConstantsResponsive.YR * 70) / 2,
    left:
      ConstantsResponsive.MAX_WIDTH / 2 - (ConstantsResponsive.XR * 100) / 2,
    borderRadius: 15,
    padding: 2,

    alignItems: "center",
    justifyContent: "center",
  },

  vsText: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  content: {},
});

export default LoadingModal;
