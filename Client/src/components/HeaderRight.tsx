import { StyleSheet, Text, View } from "react-native";
import React from "react";

import SVGProfile from "../../assets/SVGProfile.svg";

type Props = {};

const HeaderRight = () => {
  return (
    <View className="flex h-full w-full items-center justify-center ">
      <SVGProfile height={40} width={40}></SVGProfile>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
