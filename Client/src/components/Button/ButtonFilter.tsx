import React from "react";
import { Pressable, TouchableOpacity, Text } from "react-native";

type Props = {
  className?: any;
  children: string;
  textColor?: string;
} & React.ComponentProps<typeof TouchableOpacity>;

const ButtonFilter = ({
  className,
  children,
  textColor,
  onPress,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-5 ${className}`}
      {...rest}
    >
      <Text className={textColor}> {children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonFilter;
