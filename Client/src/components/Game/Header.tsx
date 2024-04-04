import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { COLOR } from "../../utils/color";
import GameLogic, { AnimatedValues } from "../../utils/game/game";
import { HEADER } from "../../constants/header";
import { useSelector } from "react-redux";
const GameHeader = () => {
  const { hp } = useSelector((state: any) => state.player);

  return (
    <View style={styles.characterArea}>
      {/* Player 1 - Left*/}
      <View style={styles.player}>
        <View style={styles.playerHeader}>
          {/* Thay anh sau */}
          <Image style={styles.avatarImage} source={Pet}></Image>
          <View style={styles.bar}>
            <View style={styles.energyBar}>
              <View
                style={{
                  height: "100%",
                  width: hp,
                  backgroundColor: COLOR.LIGHT_PURPLE,
                }}
              ></View>
            </View>
            <View style={styles.damageBar}></View>
          </View>
        </View>
        <Image style={styles.petImage} source={Pet} />
      </View>
      {/* Player 2 - Right */}
      <View style={styles.player}>
        <View style={styles.playerHeader}>
          {/* Thay anh sau */}
          <View style={styles.bar}>
            <View style={styles.energyBar}></View>
            <View style={styles.damageBar}></View>
          </View>
          <Image style={styles.avatarImage} source={Pet}></Image>
        </View>
        <Image style={styles.petImage} source={Pet} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  characterArea: {
    position: "absolute",
    top: 0,

    height: 200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  player: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  petImage: {
    width: 100,
    height: 100,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: HEADER.BORDER_RADIUS,
  },
  energyBar: {
    width: GameLogic.HEALTH_POINT,
    height: 20,
    backgroundColor: "#FF8C05",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 10,
    marginBottom: 5,
  },
  damageBar: {
    width: GameLogic.HEALTH_POINT,
    height: 20,
    backgroundColor: "#70A2FF",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 4,
  },
  bar: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
  },
  playerHeader: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  boardContainer: {
    height: "auto",
    width: "auto",
    backgroundColor: COLOR.WHITE,
    alignContent: "center",
  },
  row: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },

  imageInCell: {
    width: "80%",
    height: "80%",
  },
});

export default GameHeader;
