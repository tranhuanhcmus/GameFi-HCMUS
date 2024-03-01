import { View, Text, Image } from "react-native";
import React from "react";

import { W3mAccountButton } from "@web3modal/wagmi-react-native";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <View className="relative flex h-fit w-[100%] flex-row items-center justify-center   ">
      <W3mAccountButton balance="show" style={{ backgroundColor: "white" }} />
    </View>
  );
};

export default Header;
