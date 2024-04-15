import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Image,
  TextInput,
  Switch,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { COLOR } from "../../utils/color";
import Modal from "react-native-modal";
import ConstantsResponsive from "../../constants/Constanst";
import AwesomeButton from "react-native-really-awesome-button";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";
const LoadingModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) => {
  const navigate = useCustomNavigation();

  const [second, setSecond] = useState(3);

  // THIS HOOK COUNT DOWN BEFORE GAME
  useEffect(() => {
    if (isVisible) {
      const intervalId = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 0) {
            clearInterval(intervalId); // Stop the interval
            return prevSecond;
          } else {
            return prevSecond - 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  //   THIS HOOK NAVIGATE TO GAME WHEN SECOND IS 0
  useEffect(() => {
    if (second == 0) navigate.replace("Game");
  }, [second]);

  return isVisible ? (
    <View style={styles.container}>
      <Text>Finding room in {second} s</Text>
      <AwesomeButton
        onPress={() => {
          setIsVisible(false);
        }}
        backgroundColor={COLOR.BRIGHT_YELLOW}
        backgroundDarker={COLOR.DARK_YELLOW}
      >
        <Text>Cancel</Text>
      </AwesomeButton>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: COLOR.LIGHT_PURPLE,
    top: ConstantsResponsive.MAX_HEIGHT / 2,
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 99,
    paddingVertical: 50,
  },
});

export default LoadingModal;
