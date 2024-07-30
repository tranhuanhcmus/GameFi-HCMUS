import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import Header from "./Header";
import { StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBarHeight } from "../../function/CalculateStatusBar";
import WordBox from "./WordBox";

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
import { setVisable, setVisableSetting } from "../../redux/settingGameSlice";

import useAudioPlayer from "../../hooks/useMusicPlayer";
import { playSound } from "../../function/SoundGame";
import { NativeModules } from "react-native";
import useFetch from "../../hooks/useFetch";
import { GameService } from "../../services/GameService";
import { ContraryElement } from "../../function/ContraryElement";

// ...

const Index = () => {
  const { hp, componentHp, gameRoom, atkOpponent, elementOpponent } =
    useSelector((state: any) => state.player);
  const { turn, damage } = useSelector((state: any) => state.hangMan);

  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );

  const {
    name,
    type,
    image,
    assets,
    title,
    tokenUri,
    attributes,
    level,
    hp: hpPet,
    atk,
  } = useSelector((state: any) => state.petActive);

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
  const { apiData, serverError, isLoading } = useFetch(() =>
    GameService.questionGame(),
  );

  const [correctWord, setCorrectWords] = useState("");

  const [damagePet, setDamagePet] = useState(atk);

  useEffect(() => {
    setDamagePet(atk * ContraryElement(attributes.element, elementOpponent));
  }, []);

  useEffect(() => {
    if (apiData) {
      setCorrectWords(apiData[currentIndex].answer);
    }
  }, [currentIndex, apiData]);

  const handleDamage = useCallback((data: DataSocketTransfer) => {
    if (data?.event == "Defeat") {
      setStatus("Defeat");
    } else if (data?.event == "Victory") {
      setStatus("Victory");
    } else {
      setCorrectLetters("");
      setWrongLetters("");
      setStatus("");
      dispatch(updateHp(data.damage));
      setCurrentIndex(data.table);
    }
  }, []);

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
    if (componentHp === 0) {
      setStatus("Victory");
    }
  }, [componentHp]);

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

  const updateStatus = (cl: string) => {
    let status = "win";
    const correctWordArray = Array.from(correctWord.toUpperCase());
    correctWordArray.forEach((letter) => {
      if (!cl.includes(letter)) {
        status = "";
      }
    });

    if (status === "win") {
      // go to next word
      //dispatch(updateHp(10));
      attackComponent(damagePet, currentIndex + 1);
      setCurrentIndex((i) => i + 1);
      setCorrectLetters("");
      setWrongLetters("");
      setStatus("");
    }
    setStatus(status);
  };

  const handleSurrender = () => {
    handleCloseModal();
    setTimeout(() => {
      setStatus("Defeat");
    }, 1000);

    socket.emitEventGame({
      gameRoom: gameRoom,
      damage: null,
      event: "Victory",
    });
  };

  const handlePopupButton = () => {
    // clear all stored data
    // replay
    setStatus("");

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

  useAudioPlayer(music, "soundTrackGame");

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
    socket.onListenFirstTurn((data) => {
      console.log(data);
      dispatch(updateTurn(data));
    });

    socket.onListenDisConnect((data) => {
      handleCloseModal();
      setTimeout(() => {
        console.log(data);
        setStatus("Victory");
      }, 500);
    });

    socket.onListenTakeDamage(handleDamage);

    return () => {
      // Remove the event listeners:
      socket.removeListenFristTurn();
      socket.removeListenOppentDisconnect();
      socket.removeListenTakeDamage();
    };
  }, []);

  return isLoading && apiData === null ? (
    <></>
  ) : (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        source={require("../../../assets/gameBackGround.png")}
        style={styles.bgHeader}
      />

      <SafeAreaView style={{ marginTop: StatusBarHeight }}>
        <View style={styles.playArea}>
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
            <Image
              resizeMode="stretch"
              source={require("../../../assets/backGroundForTableQuestion.png")}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            <WordBox wordData={apiData !== null && apiData[currentIndex]} />
          </View>

          <InputBox correctLetters={correctLetters} answer={correctWord} />
          <Keyboard
            turn={turn}
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            onPress={(input: string) => {
              playSound(sound, "pressTyping");
              storeCorrectLetters(input);
            }}
          />
          <StatusPopup status={status} onPress={handlePopupButton} />
        </View>
        <GameSettings
          isVisible={isVisable}
          onClose={handleCloseModal}
          onSurrender={handleSurrender}
        />
      </SafeAreaView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
  },
  containHeader: {
    height: ConstantsResponsive.MAX_HEIGHT * 0.35 - StatusBarHeight,
  },

  bgHeader: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    // height: ConstantsResponsive.MAX_HEIGHT * 0.2 + StatusBarHeight,
    position: "absolute",
  },
  playArea: {
    alignItems: "center",
    display: "flex",

    height: ConstantsResponsive.MAX_HEIGHT * 0.85,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 105,
    flexDirection: "column",

    marginHorizontal: ConstantsResponsive.XR * 50,
    rowGap: ConstantsResponsive.YR * 20,
  },
  WordBox: {
    display: "flex",
    width: "100%",
    height: ConstantsResponsive.MAX_HEIGHT * 0.12,
  },
});
