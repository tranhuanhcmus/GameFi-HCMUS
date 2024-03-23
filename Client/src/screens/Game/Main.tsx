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
import Pet from "../../../assets/Pet.png";
import Fire from "../../../assets/fire.jpg";
import LightNight from "../../../assets/lightnight.jpg";
import Shield from "../../../assets/shield.jpg";
import Sword from "../../../assets/sword.jpg";
import YinYan from "../../../assets/batquai.jpg";
import { COLOR } from "../../utils/color";
import NormalButton from "../../components/Button/NormalButton";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import GameHeader from "../../components/Game/Header";
import GameBoard from "../../components/Game/Board";
import UpperLayer from "../../components/Game/UpperLayer";
import { store } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-native-really-awesome-button";

const GameScreen = () => {
  const [blockList, setBlockList] = useState(useRef<any[]>([]));
  const number = useSelector((state: any) => state.board.number);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const navigate = useCustomNavigation();
  const { turn, damage } = useSelector((state: any) => state.board);

  return (
    <SafeAreaView>
      <View style={styles.container}>
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
});

export default GameScreen;
