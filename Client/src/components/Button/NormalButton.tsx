import React from "react";
import { Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import DropShadow from "react-native-drop-shadow";

type Props = {
  className?: any;
  children: React.ReactNode;
  shadowColor?: string;
} & React.ComponentProps<typeof TouchableOpacity>;

const NormalButton = ({
  className,
  children,
  onPress,
  shadowColor,
  ...rest
}: Props) => {
  return (
    <DropShadow style={[styles.shadowProp, { shadowColor: shadowColor }]}>
      <TouchableOpacity onPress={onPress} {...rest}>
        <Shadow></Shadow>
        {children}
      </TouchableOpacity>
    </DropShadow>
  );
};

export default NormalButton;

const styles = StyleSheet.create({
  shadowProp: {
    shadowOffset: { width: 2, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
