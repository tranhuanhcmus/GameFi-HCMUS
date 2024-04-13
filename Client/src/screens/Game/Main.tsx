import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import backGroundImage from "../../../assets/background3.png";
import { COLOR } from "../../utils/color";
import NormalButton from "../../components/Button/NormalButton";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import GameHeader from "../../components/Game/Header";
import GameBoard from "../../components/Game/Board";
import UpperLayer from "../../components/Game/UpperLayer";
import { store } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-native-really-awesome-button";
import { SocketIOClient } from "../../../socket";
import { updateComponentHp, updateHp } from "../../redux/playerSlice";
import ConstantsResponsive from "../../constants/Constanst";

const GameScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const { turn, damage, blockList, swapCells } = useSelector(
    (state: any) => state.board,
  );

  const { hp, componentHp } = useSelector((state: any) => state.player);
  const socket = SocketIOClient.getInstance();
  const room = "room-101";

  useEffect(() => {
    console.log("Chay useEffect nay ");
    if (hp <= 0) {
      console.log("STOP GAME");
    } else {
      socket.onListenAttack((data) => {
        console.log("Ah bi tan cong, cmn ", data);
        dispatch(updateHp(data));
      });
    }
  }, []); // BUGGGGGGGG

  useEffect(() => {
    socket.emitJoinRoom(room);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          resizeMode="stretch"
          source={backGroundImage}
        />
        <GameHeader />

        <UpperLayer />

        <GameBoard socket={socket} />

        <View
          style={{
            top: 300,
          }}
        >
          <Text style={{ color: COLOR.WHITE }}>
            turn: {turn} damage: {damage}
          </Text>
          <Text style={{ color: COLOR.WHITE }}>
            hp: {hp} componentHp: {componentHp}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.PURPLE,
    width: "100%",
    height: "100%",
    // display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },
});

export default GameScreen;
function dispatch(arg0: { payload: any; type: "player/updateHp" }) {
  throw new Error("Function not implemented.");
}
