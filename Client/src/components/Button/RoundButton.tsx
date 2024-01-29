import { StyleSheet, Text, TouchableOpacityProps } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import AwesomeButton from "react-native-really-awesome-button";

import React from "react";
import { COLOR } from "../../utils/color";

interface RoundButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}
// TODO: Add property for this function later
export function RoundButton({ onPress, ...props }: RoundButtonProps) {
  return (
    <AwesomeButton
      onPress={onPress}
      style={styles.addButton}
      backgroundDarker={COLOR.DARK_YELLOW}
      backgroundColor={COLOR.YELLOW}
      width={80}
      height={80}
      borderRadius={100}
    >
      {/* <FontAwesomeIcon icon={faMugSaucer} /> */}
      <Text>+</Text>
    </AwesomeButton>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
