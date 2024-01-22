import { View, Text } from "react-native";
import React from "react";
import SVGSetting from "../../assets/SVGSetting.svg";

type Props = {};

const HeaderLeft = (props: Props) => {
  return (
    <View className=" w-fit rounded-full bg-white">
      <SVGSetting height={30} witdh={30} />
    </View>
  );
};

export default HeaderLeft;
