import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import ConstantsResponsive from "../constants/Constanst";
import { COLOR } from "../utils/color";
import CustomText from "./CustomText";
import Damage from "../../assets/damage.svg";
import Coin from "../../assets/coin.svg";
import useCustomNavigation from "../hooks/useCustomNavigation";
interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const navigate = useCustomNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("Shop");
      }}
      style={{
        position: "absolute",
        left: ConstantsResponsive.MAX_WIDTH * 0.15,
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.06,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: COLOR.DARKER_PURPLE,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Coin></Coin>
        <CustomText
          style={{
            color: COLOR.YELLOW,
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          100
        </CustomText>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Damage />
        <CustomText
          style={{
            color: COLOR.CYAN,
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          3
        </CustomText>
      </View>
    </TouchableOpacity>

    // <View className="relative flex h-fit w-[100%] flex-row items-center justify-center   ">
    //   <W3mAccountButton balance="show" style={{ backgroundColor: "white" }} />
    // </View>
  );
};

export default Header;
