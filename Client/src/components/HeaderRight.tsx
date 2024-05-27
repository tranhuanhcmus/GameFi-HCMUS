import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import SVGProfile from "../../assets/SVGProfile.svg";
import Profile from "../../assets/avatar.png";
import useCustomNavigation from "../hooks/useCustomNavigation";

type Props = {};

const HeaderRight = () => {
  const navigate = useCustomNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("Profile");
      }}
    >
      <Image
        source={require("../../assets/avatar.png")}
        style={{ width: 40, height: 40, marginRight: 5 }}
      />
    </TouchableOpacity>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
