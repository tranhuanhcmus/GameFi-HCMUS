import React, { useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import ConstantsResponsive from "../constants/Constanst";
import Modal from "react-native-modal";
import { COLOR } from "../utils/color";
import AwesomeButton from "react-native-really-awesome-button";
import { useDispatch } from "react-redux";
import { setMusic, setSound } from "../redux/settingGameSlice";
import { useSelector } from "react-redux";

interface Props {
  isVisible?: boolean;
  onClose?: () => void;
}

const GameSettings: React.FC<Props> = ({ isVisible, onClose }) => {
  const { isVisable, sound, music } = useSelector(
    (state: any) => state.settingGame,
  );
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
        <Text style={styles.header}>SETTINGS</Text>

        <View style={styles.setting}>
          <Text style={styles.body}>Music:</Text>
          <Switch
            trackColor={{ false: "#767577", true: COLOR.GREEN }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchMusic}
            value={music}
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.body}>Sound:</Text>
          <Switch
            trackColor={{ false: "#767577", true: COLOR.GREEN }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchSound}
            value={sound}
          />
        </View>

        <View style={styles.btn}>
          <AwesomeButton
            onPress={onClose}
            backgroundColor={COLOR.RED}
            borderRadius={15}
            backgroundDarker={COLOR.DARK_YELLOW}
            height={styles.btn.height}
            width={styles.btn.width}
          >
            <Text className="font-bold text-white ">Cancel</Text>
          </AwesomeButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ConstantsResponsive.MAX_HEIGHT * 0.35,
    width: ConstantsResponsive.MAX_WIDTH * 0.7,

    padding: 20,
    backgroundColor: COLOR.BLUE,
    borderRadius: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  body: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  setting: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  btn: {
    position: "absolute",
    bottom: ConstantsResponsive.YR * 10,
    left:
      (ConstantsResponsive.MAX_WIDTH * 0.7 - ConstantsResponsive.XR * 150) / 2,
    width: ConstantsResponsive.XR * 150,
    height: ConstantsResponsive.XR * 80,
  },
});

export default GameSettings;
