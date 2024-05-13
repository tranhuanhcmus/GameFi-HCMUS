import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Healthpoint from "../../../assets/Healthpoint.svg";
import Pet from "../../../assets/Pet.png"; // TODO: CHANGE LATER
import Damage from "../../../assets/Damage.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import CloseButton from "../../../assets/carbon_close-filled.svg";
import Heart from "../../../assets/Healthpoint.svg";

const StatisticModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) => {
  const navigate = useCustomNavigation();

  return isVisible ? (
    <View
      style={{
        position: "absolute",
        backgroundColor: COLOR.DARKER_PURPLE,
        height: "auto",
        width: ConstantsResponsive.MAX_WIDTH,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 9999,
        bottom: 0,
      }}
    >
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: 50,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <CloseButton></CloseButton>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        <Heart></Heart>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
              Healthpoint
            </CustomText>
            <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
              20
            </CustomText>
          </View>
          <View
            style={{
              width: 300,
              height: 20,
              backgroundColor: COLOR.RED,
              borderRadius: 10,
            }}
          ></View>
        </View>
      </View>

      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        <Damage></Damage>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
              Damage
            </CustomText>
            <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
              10
            </CustomText>
          </View>
          <View
            style={{
              width: 300,
              height: 20,
              backgroundColor: COLOR.CYAN,
              borderRadius: 10,
            }}
          ></View>
        </View>
      </View>
      <View></View>
    </View>
  ) : null;
};
export default StatisticModal;
