import React from "react";
import {
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";

type Props = {
  className?: any;
  children: React.ReactNode;
  style?: ViewStyle;
} & React.ComponentProps<typeof TouchableOpacity>;

const NormalButton = ({
  className,
  children,
  onPress,
  style,
  ...rest
}: Props) => {
  return (
    // <DropShadow style={[styles.shadowProp, { shadowColor: shadowColor }]}>
    <TouchableOpacity
      onPress={onPress}
      {...rest}
      style={[styles.shadowProp, style]}
    >
      {children}
    </TouchableOpacity>
    // </DropShadow>
  );
};

export default NormalButton;

const styles = StyleSheet.create({
  shadowProp: {
    shadowOffset: { width: 3.5, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5, // Elevation for Android shadow
  },
});
