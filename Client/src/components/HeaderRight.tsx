import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import SVGProfile from "../../assets/SVGProfile.svg";
import Profile from "../../assets/avatar.png";

type Props = {};

const HeaderRight = () => {
  return (
    <Image
      source={require("../../assets/avatar.png")}
      style={{ width: 40, height: 40, marginRight: 5 }}
    />
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
