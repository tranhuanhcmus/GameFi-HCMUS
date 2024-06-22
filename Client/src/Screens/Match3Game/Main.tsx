import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
// import SwappableGrid from '../components/SwappableGrid';
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import GameHeader from "../../components/Game/Header";
import ConstantsResponsive from "../../constants/Constanst";
import { StatusBarHeight } from "../../function/CalculateStatusBar";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import logger from "../../logger";
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
  const { turn, damage } = useSelector((state: any) => state.player);

  const handleEndTime = () => {
    logger.debug("Hello");
    // dispatch(swapTurn());
  };

  return (
    <ImageBackground source={justClouds} style={styles.backGroundImage}>
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
        <SwappableGrid setMoveCount={setMoveCount} setScore={setScore} />
      </SafeAreaView>
    </ImageBackground>
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
