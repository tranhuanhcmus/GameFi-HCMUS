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
import { updateHp } from "../../redux/playerSlice";
import ConstantsResponsive from "../../constants/Constanst";

const GameScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const { turn, damage, blockList, swapCells } = useSelector(
    (state: any) => state.board,
  );

  const { hp } = useSelector((state: any) => state.player);
  const socket = SocketIOClient.getInstance();
  const room = "room-101";
  useEffect(() => {
    // ATTACK
    // socket.emitAttack({ room, damage, blockList, swapCells });
  }, [damage, blockList]);

  useEffect(() => {
    console.log("hp ", hp);
    if (hp <= 0) {
      console.log("STOP GAME");
    } else {
      dispatch(updateHp(damage));
      // socket.onListenAttack((data) => dispatch(updateHp({ data })));
    }
  }, [damage, blockList]);
  useEffect(() => {
    console.log("hp ", hp);
  }, []);
  // useEffect(() => {
  //   socket.emitJoinRoom(room);
  // }, []);

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

        <GameBoard />

        <View
          style={{
            top: 300,
          }}
        >
          <Text style={{ color: COLOR.WHITE }}>turn: {turn}</Text>
          <Text style={{ color: COLOR.WHITE }}>damage: {damage}</Text>
        </View>
        {/* TODO: Bottom nav */}
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
