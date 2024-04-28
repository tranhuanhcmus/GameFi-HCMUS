import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLOR } from "../../utils/color";
import ConstantsResponsive from "../../constants/Constanst";
import AwesomeButton from "react-native-really-awesome-button";
import log from "../../logger/index.js";
const FinishModal = ({
  isVisible,
  setIsVisible,
  isWinner,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  isWinner: boolean;
}) => {
  useEffect(() => {}, [isVisible]);

  return isVisible ? (
    <View style={styles.container}>
      {isWinner ? <Text>You win</Text> : <Text>You lose</Text>}
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
    width: ConstantsResponsive.MAX_WIDTH,
    height: 200,
    backgroundColor: COLOR.LIGHT_PURPLE,
    top: ConstantsResponsive.MAX_HEIGHT / 10,
    left: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 99,
    paddingVertical: 50,
  },
});

export default FinishModal;
