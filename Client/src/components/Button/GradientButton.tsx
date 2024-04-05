import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, TouchableOpacity } from "react-native";

type Props = {
  className?: any;
  children: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity> &
  React.ComponentProps<typeof LinearGradient>;

const GradientButton = ({
  className,
  children,
  onPress,
  colors,
  locations,
  start,
  style,
  end,
  ...rest
}: Props) => {
  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      style={style}
      end={end}
      className={`my-2 rounded-[16px] bg-[#61dafb] px-2 py-3 ${className}`}
    >
      <TouchableOpacity onPress={onPress} {...rest}>
        {children}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GradientButton;
