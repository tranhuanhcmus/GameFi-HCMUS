import React, { useEffect } from "react";
import { View, Text, Switch, StyleSheet, Image } from "react-native";
import ConstantsResponsive from "../constants/Constanst";
import Modal from "react-native-modal";
import { COLOR } from "../utils/color";
import AwesomeButton from "react-native-really-awesome-button";
import { useDispatch } from "react-redux";
import { setMusic, setSound } from "../redux/settingGameSlice";
import { useSelector } from "react-redux";
import NormalButton from "./Button/NormalButton";
import { useRoute } from "@react-navigation/native";

interface Props {
  isVisible?: boolean;
  onClose?: () => void;
  onSurrender?: () => void;
}

const GameSettings: React.FC<Props> = ({ isVisible, onClose, onSurrender }) => {
  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );
  const route = useRoute();

  const dispatch = useDispatch();
  const toggleSwitchMusic = () => {
    dispatch(setMusic(!music));
  };

  const toggleSwitchSound = () => {
    dispatch(setSound(!sound));
  };

  return (
    <Modal isVisible={isVisible} style={{ alignItems: "center" }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/backGroundForInventory.png")}
          style={{
            height: "120%",
            width: "120%",
            position: "absolute",
            borderRadius: 20,
          }}
        />

        <View style={styles.btnDelete}>
          <NormalButton
            onPress={onClose}
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/delete.png")}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
            />
          </NormalButton>
        </View>
        <Text style={styles.header}>SETTINGS</Text>

        <View style={styles.setting}>
          <Text style={styles.body}>Music:</Text>
          <Switch
            trackColor={{ false: "#767577", true: COLOR.RED_BG_BUTTON }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchMusic}
            value={music}
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.body}>Sound:</Text>
          <Switch
            trackColor={{ false: "#767577", true: COLOR.RED_BG_BUTTON }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchSound}
            value={sound}
          />
        </View>

        <View style={styles.btn}>
          <NormalButton
            onPress={onSurrender}
            style={{
              height: "100%",
              width: "100%",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/backGroundButtonRed_1.png")}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontSize: ConstantsResponsive.XR * 29,
                color: COLOR.WHITE,
              }}
            >
              Surrender
            </Text>
          </NormalButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ConstantsResponsive.MAX_HEIGHT * 0.4,
    width: ConstantsResponsive.MAX_WIDTH * 0.7,
    position: "relative",
    padding: 20,
    alignItems: "center",

    borderRadius: 25,
  },
  header: {
    fontSize: 32,

    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  body: {
    fontSize: 20,

    color: "white",
  },

  setting: {
    color: "white",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  btn: {
    position: "absolute",
    bottom: ConstantsResponsive.YR * 10,

    width: ConstantsResponsive.XR * 190,
    height: ConstantsResponsive.XR * 90,
  },
  btnDelete: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 0,
    right: ConstantsResponsive.XR * -30,
    width: ConstantsResponsive.XR * 80,
    height: ConstantsResponsive.XR * 80,
  },
});

export default GameSettings;
