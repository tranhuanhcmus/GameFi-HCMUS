import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SVGSetting from "../../assets/SVGSetting.svg";

type Props = {};

const HeaderLeft = (props: Props) => {
  return (
    <View className="flex h-full w-full items-center justify-center ">
      <SVGSetting height={40} width={40}></SVGSetting>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({});
