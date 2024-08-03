import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { SocketIOClient } from "../../../socket";
import ConstantsResponsive from "../../constants/Constanst";
import { StatusBarHeight } from "../../function/CalculateStatusBar";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import logger from "../../logger";
import { swapTurn, updateTurn } from "../../redux/hangManSlice";
import { setVisable } from "../../redux/settingGameSlice";
import { initSocket } from "../../redux/socketSlice";
import GameHeader from "../HangManGame/Header";
import TimingLine from "../HangManGame/TimingLine";
import SwappableGrid from "./components/SwappableGrid";

// import Images from '../lib/Images';

// let playButton = require('../assets/PlayButton.png')

let justClouds = require("./assets/Background.png");

const GameScreen = () => {
  const [moveCount, setMoveCount] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useCustomNavigation();
  const [timing, setTiming] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const isFocused = useIsFocused();
  const socket = SocketIOClient.getInstance();
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const handleEndTime = () => {
    logger.debug("Hello");
    dispatch(swapTurn());
  };

  // const { socket } = useSelector((state: any) => state.socket);

  const { gameRoom, hp, componentHp, isComponentTurn } = useSelector(
    (state: any) => state.player,
  );

  const { turn, damage } = useSelector((state: any) => state.hangMan);

  useEffect(() => {
    initSocket();
  }, []);
  const handleCloseModal = () => {
    dispatch(setVisable(false));
  };

  useEffect(() => {
    if (status == "Defeat" || status == "Victory") {
      // setGameOver(true);
      dispatch(updateTurn(false));
      socket.emitSuccess(gameRoom);
      socket.removeListenFristTurn();
      socket.removeListenTakeDamage();
    }
  }, [status]);

  useEffect(() => {
    if (componentHp <= 0) {
      setStatus("Victory");
    }
  }, [componentHp]);

  useEffect(() => {
    socket.onListenFirstTurn((data: any) => {
      console.log(data);
      dispatch(updateTurn(data));
    });

    socket.onListenDisConnect((data: any) => {
      handleCloseModal();
      setTimeout(() => {
        console.log(data);
        setStatus("Victory");
      }, 500);
    });

    // socket.onListenTakeDamage(handleDamage);

    return () => {
      // Remove the event listeners:
      socket.removeListenFristTurn();
      socket.removeListenOppentDisconnect();
      socket.removeListenTakeDamage();
    };
  }, []);

  return (
    <View
      style={{ height: styles.bgHeader.height, width: styles.bgHeader.width }}
    >
      <Image
        resizeMode="stretch"
        source={require("../../../assets/gameBackGround.png")}
        style={styles.bgHeader}
      />
      <SafeAreaView style={styles.scoreBoard}>
        <View
          style={{
            height: ConstantsResponsive.MAX_HEIGHT * 0.35 - StatusBarHeight,
          }}
        >
          <GameHeader />
        </View>
        <TimingLine
          gameOver={gameOver}
          turn={turn}
          leaveScreen={!isFocused}
          duration={timing}
          onCompletion={handleEndTime}
        />
        <SwappableGrid
          socket={socket}
          setMoveCount={setMoveCount}
          setScore={setScore}
        />
      </SafeAreaView>
    </View>
  );
};

let Window = Dimensions.get("window");

let windowWidth = Window.width;
let windowHeight = Window.height;

let styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bgHeader: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    // height: ConstantsResponsive.MAX_HEIGHT * 0.2 + StatusBarHeight,
    position: "absolute",
  },
  scoreBoard: {
    alignItems: "center",
    display: "flex",

    height: ConstantsResponsive.MAX_HEIGHT * 0.85,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 105,
    flexDirection: "column",

    marginHorizontal: ConstantsResponsive.XR * 50,
    // backgroundColor: red,
  },
  scoreElement: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: 'blue',
  },
});

export default GameScreen;
