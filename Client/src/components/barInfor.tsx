import React from "react";
import { View, StyleSheet } from "react-native";
import ConstantsResponsive from "../constants/Constanst";
import CustomText from "./CustomText";
import { COLOR } from "../utils/color";

interface Props {
  color: string;
  title: string;
  value: number;
}

const BarInfor: React.FC<Props> = ({ color, title, value }) => {
  let healthBarWidth =
    ((ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 300 -
      ConstantsResponsive.XR * 60 -
      ConstantsResponsive.XR * 6) *
      90) /
    800;

  return (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CustomText style={styles.text}>{title}</CustomText>
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 250,
          flexDirection: "row",

          alignItems: "center",
          columnGap: 10,
        }}
      >
        <View style={styles.healthBar}>
          <View
            style={[
              styles.healthBarInner,
              { width: healthBarWidth, backgroundColor: color },
            ]}
          />
        </View>
        <CustomText style={styles.text}>{value}</CustomText>
      </View>
    </View>
  );
};

export default BarInfor;

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
    left: ConstantsResponsive.XR * 3,
    top: ConstantsResponsive.YR * 3,
    bottom: ConstantsResponsive.YR * 3,
    borderRadius: ConstantsResponsive.YR * 8,
  },
  text: {
    width: ConstantsResponsive.XR * 150,
    fontFamily: "rexlia",

    fontSize: ConstantsResponsive.YR * 30,
    color: "white",
  },
  area: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: "100%",
    flexDirection: "column",
    paddingHorizontal: ConstantsResponsive.XR * 80,
    paddingVertical: ConstantsResponsive.YR * 40,
  },
});
