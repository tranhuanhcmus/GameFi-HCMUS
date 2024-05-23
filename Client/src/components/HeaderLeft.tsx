import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Setting from "../../assets/setting.svg";
import { COLOR } from "../utils/color";
import ConstantsResponsive from "../constants/Constanst";

type Props = {};

const HeaderLeft = (props: Props) => {
  return <Setting height={30} width={30} style={{ marginLeft: 10 }}></Setting>;
};

export default HeaderLeft;

const styles = StyleSheet.create({});
