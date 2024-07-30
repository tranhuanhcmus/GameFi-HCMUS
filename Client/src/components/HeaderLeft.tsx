import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Setting from "../../assets/setting.svg";
import { COLOR } from "../utils/color";
import ConstantsResponsive from "../constants/Constanst";
import { useDispatch } from "react-redux";
import { setVisable, setVisableSetting } from "../redux/settingGameSlice";

type Props = {};

const HeaderLeft = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setVisableSetting(true));
      }}
    >
      <Setting height={40} width={40} style={{ marginLeft: 10 }}></Setting>
    </TouchableOpacity>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({});
