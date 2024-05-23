import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import Header from "./Header";
import ManFigure from "./ManFigure";
import WordBox from "./WordBox";
import { WordsArray } from "./data";
import InputBox from "./InputBox";
import Keyboard from "./Keyboard";
import ConstantsResponsive from "../../constants/Constanst";
import StatusPopup from "./StatusPopup";
import colors from "../../../common/colors";
import { useDispatch, useSelector } from "react-redux";
import { updateHp } from "../../redux/playerSlice";
import TimingLine from "./TimingLine";
import { SocketIOClient } from "../../../socket";
import { Animated } from "react-native";
import {
  updateComponentHp,
  setComponentHp,
  setHp,
} from "../../redux/playerSlice";
import { updateTurn } from "../../redux/hangManSlice";
import { swapTurn } from "../../redux/hangManSlice";
import { DataSocketTransfer } from "../../../socket";
import { useIsFocused } from "@react-navigation/native";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import GameSettings from "../../components/GameSetting";
import { setVisable } from "../../redux/settingGameSlice";
import { Audio } from "expo-av";
import useAudioPlayer from "../../hooks/useMusicPlayer";

const Index = () => {
  const { hp, componentHp, gameRoom } = useSelector(
    (state: any) => state.player,
  );
  const { turn, damage } = useSelector((state: any) => state.hangMan);

  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );
  const dispatch = useDispatch();
  const navigate = useCustomNavigation();
  const socket = SocketIOClient.getInstance();
  const [correctLetters, setCorrectLetters] = useState("");
  const [wrongLetters, setWrongLetters] = useState("");
  const [status, setStatus] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timing, setTiming] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const isFocused = useIsFocused();
  const soundGame = new Audio.Sound();

  const correctWord = WordsArray[currentIndex].answer;

  const handleDamage = useCallback((data: DataSocketTransfer) => {
    if (data?.event == "Defeat") {
      setStatus("Defeat");
    } else if (data?.event == "Victory") {
      setStatus("Victory");
    } else {
      console.log(data.damage);
      dispatch(updateHp(data.damage));
      setCurrentIndex(data.table);
    }
  }, []);

  useEffect(() => {
    if (status == "Defeat" || status == "Victory") {
      setGameOver(true);
    }
  }, [status]);

  const storeCorrectLetters = (keyInput: string) => {
    const ans = correctWord.toUpperCase();
    if (ans.includes(keyInput)) {
      const cl = correctLetters + keyInput;
      setCorrectLetters(cl);
      // check win
      updateStatus(cl);
    } else {
      const wl = wrongLetters + keyInput;
      setWrongLetters(wl);
      if (wl.length > 2) {
        // lost
        setStatus("Defeat");
        socket.emitEventGame({
          gameRoom: gameRoom,
          damage: null,
          event: "Victory",
        });
      }
    }
  };

  const attackComponent = (damage: number, indexQuestion: number) => {
    if (componentHp - damage <= 0) {
      setStatus("Victory");
      socket.emitEventGame({
        gameRoom: gameRoom,
        damage: damage,
        table: indexQuestion,
        event: "Defeat",
      });
    } else {
      socket.emitEventGame({
        gameRoom: gameRoom,
        damage: damage,
        table: indexQuestion,
      });
    }
    dispatch(updateComponentHp(damage));
  };

  useEffect(() => {
    if (componentHp == 0) {
      setStatus("Victory");
    }
  }, [componentHp]);

  const updateStatus = (cl: string) => {
    let status = "win";
    const correctWordArray = Array.from(correctWord.toUpperCase());
    correctWordArray.forEach((letter) => {
      if (!cl.includes(letter)) {
        status = "";
      }
    });
    // if (status === "win" && currentIndex === WordsArray.length - 1) {
    //   setStatus("completed");
    //   return;
    // }

    if (status === "win") {
      // go to next word
      //dispatch(updateHp(10));
      attackComponent(10, currentIndex + 1);
      setCurrentIndex((i) => i + 1);
      setCorrectLetters("");
      setWrongLetters("");
      setStatus("");
    }
    setStatus(status);
  };

  const handlePopupButton = () => {
    // clear all stored data
    // replay
    setStatus("");
    dispatch(setComponentHp(40));
    dispatch(setHp(40));
    dispatch(updateTurn(false));
    socket.emitSuccess(gameRoom);
    socket.removeListenFristTurn();
    socket.removeListenTakeDamage();
    navigate.navigate("MainTab");
  };

  const handleEndTime = () => {
    setCorrectLetters("");
    setWrongLetters("");
    setStatus("");

    dispatch(swapTurn());
  };
  const handleCloseModal = () => {
    dispatch(setVisable(false));
  };

  useAudioPlayer(sound);

  useEffect(() => {
    socket.onListenFirstTurn((data) => {
      console.log(data);
      dispatch(updateTurn(data));
    });

    socket.onListenTakeDamage(handleDamage);

    return () => {
      // Remove the event listeners:
      socket.removeListenFristTurn();
      socket.removeListenTakeDamage();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GameSettings isVisible={isVisable} onClose={handleCloseModal} />
      <View style={styles.playArea}>
        {/* <View style={styles.row}>
          <ManFigure wrongWord={wrongLetters.length} />
        </View> */}
        <View style={styles.containHeader}>
          <Header></Header>
        </View>
        <TimingLine
          gameOver={gameOver}
          turn={turn}
          leaveScreen={!isFocused}
          duration={timing}
          onCompletion={handleEndTime}
        />
        <View style={styles.WordBox}>
          <WordBox wordData={WordsArray[currentIndex]} />
        </View>

        <InputBox correctLetters={correctLetters} answer={correctWord} />
        <Keyboard
          turn={turn}
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          onPress={(input: string) => storeCorrectLetters(input)}
        />
        <StatusPopup status={status} onPress={handlePopupButton} />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
  },
  containHeader: {
    height: ConstantsResponsive.MAX_HEIGHT * 0.2,
  },
  playArea: {
    display: "flex",
    height: ConstantsResponsive.MAX_HEIGHT,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 40,
    flexDirection: "column",

    marginHorizontal: ConstantsResponsive.XR * 20,
    gap: ConstantsResponsive.YR * 20,
  },
  WordBox: {
    display: "flex",
    flexDirection: "column",
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 40,
    height: ConstantsResponsive.MAX_HEIGHT * 0.1,
  },
});
