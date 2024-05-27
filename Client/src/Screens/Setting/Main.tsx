import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import ConstantsResponsive from "../../constants/Constanst";
import Modal from "react-native-modal";
import { COLOR } from "../../utils/color";
import AwesomeButton from "react-native-really-awesome-button";

interface Props {
  isVisible?: boolean;
  onClose?: () => void;
}

const GameSettings: React.FC<Props> = ({ isVisible, onClose }) => {
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = React.useState(false);

  const toggleSwitchMusic = () =>
    setIsAudioEnabled((previousState) => !previousState);
  const toggleSwitchSound = () =>
    setIsSoundEnabled((previousState) => !previousState);

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
            value={isAudioEnabled}
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.body}>Sound:</Text>
          <Switch
            trackColor={{ false: "#767577", true: COLOR.GREEN }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchSound}
            value={isSoundEnabled}
          />
        </View>

        <View className="absolute bottom-4">
          <AwesomeButton
            onPress={onClose}
            backgroundColor={COLOR.RED}
            borderRadius={15}
            backgroundDarker={COLOR.DARK_YELLOW}
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
});

export default GameSettings;
