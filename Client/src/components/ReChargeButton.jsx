import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { API } from "../apis/constants";
import ConstantsResponsive from "../constants/Constanst";
import CustomText from "./CustomText";
import { COLOR } from "../utils/color";

const ReChargeButton = () => {
  return (
    <View style={{ display: "flex", flexDirection: "row", columnGap: 5 }}>
      <Image
        resizeMode="contain"
        source={{ uri: API.server + itemImg }}
        style={styles.img}
      />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            textAlign: "center",
            color: COLOR.WHITE,

            fontSize: ConstantsResponsive.YR * 30,
          }}
        >
          {quantity}X
        </CustomText>
        <CustomText
          style={{
            textAlign: "center",
            color: COLOR.WHITE,

            maxWidth: ConstantsResponsive.XR * 100,
            fontSize: ConstantsResponsive.YR * 20,
          }}
        >
          {name}
        </CustomText>
      </View>
    </View>
  );
};

export default ReChargeButton;

const styles = StyleSheet.create({
  container: {
    height: ConstantsResponsive.MAX_HEIGHT / 2.5,
    borderRadius: ConstantsResponsive.XR * 60,
  },
  img: {
    width: ConstantsResponsive.MAX_WIDTH / 3,
    height: ConstantsResponsive.MAX_WIDTH / 3,
  },
});
