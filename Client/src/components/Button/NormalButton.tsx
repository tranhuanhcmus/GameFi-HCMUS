import React from "react";
import { Pressable, TouchableOpacity } from "react-native";

type Props = {
  className?: any;
  children: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>;

const NormalButton = ({ className, children, onPress, ...rest }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`my-2 rounded-[16px] bg-[#61dafb] px-2 py-3 ${className}`}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

export default NormalButton;
