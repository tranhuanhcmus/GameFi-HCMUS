import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";

import BarInfor from "../../components/barInfor";
import ConstantsResponsive from "../../constants/Constanst";

import CustomText from "../../components/CustomText";

import { COLOR } from "../../utils/color";

import CloseButton from "../../../assets/carbon_close-filled.svg";
import { getLevel } from "../../utils/pet";

type Props = {};

const StatsModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;

  setIsVisible: (value: boolean) => void;
}) => {
  const { hp, atk, level } = useSelector((state: any) => state.pet);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.backgroundImage}>
        <Image
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            height: ConstantsResponsive.MAX_HEIGHT * 0.3,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../../../assets/backGroundForInventory.png")}
        />
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 20,
            height: "10%",
            zIndex: 100,

            paddingEnd: 10,
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
        <View style={styles.area}>
          <View
            style={{
              width: ConstantsResponsive.MAX_WIDTH,

              display: "flex",
              flexDirection: "row",
              columnGap: ConstantsResponsive.XR * 100,
            }}
          >
            <CustomText style={styles.text}>
              LEVEL {Math.floor(getLevel(level))}
            </CustomText>
            <CustomText style={styles.text}>Common Pet</CustomText>
          </View>
          <BarInfor color="green" title="Health" value={hp} />
          <BarInfor color="red" title="Damage" value={atk} />
        </View>
      </View>
    </Modal>
  );
};

export default StatsModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT * 0.3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
  },

  healthIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: ConstantsResponsive.YR * 46,
    height: ConstantsResponsive.YR * 40,
  },
  healthBar: {
    height: ConstantsResponsive.YR * 20,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 370,

    marginLeft: ConstantsResponsive.XR * 40,
    backgroundColor: COLOR.GRAY2,
    borderRadius: ConstantsResponsive.YR * 10,
  },
  healthBarInner: {
    position: "absolute",
    backgroundColor: "#ff1a1a",
    left: ConstantsResponsive.XR * 3,

    top: ConstantsResponsive.YR * 3,
    bottom: ConstantsResponsive.YR * 3,
    borderRadius: ConstantsResponsive.YR * 8,
  },

  text: {
    fontFamily: "rexlia",
    fontWeight: "bold",
    fontSize: ConstantsResponsive.YR * 30,
    color: "white",
  },

  area: {
    width: ConstantsResponsive.MAX_WIDTH,

    height: "100%",
    flexDirection: "column",
    paddingHorizontal: ConstantsResponsive.XR * 40,
    rowGap: ConstantsResponsive.XR * 20,
    paddingVertical: ConstantsResponsive.YR * 40,
  },
});
