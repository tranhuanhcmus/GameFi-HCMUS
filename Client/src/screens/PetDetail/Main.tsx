import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Damage from "../../../assets/thunder.svg";
import Heart from "../../../assets/Healthpoint.svg";

import Fire from "../../../assets/elements/Fire.png";
import Leaf from "../../../assets/elements/Leaf.png";
import Water from "../../../assets/elements/Water.png";
import Stone from "../../../assets/elements/Stone.png";
import Iron from "../../../assets/elements/Iron.png";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import AwesomeButton from "react-native-really-awesome-button";
import { COLOR } from "../../utils/color";
import axios from "axios";
import logger from "../../logger";
import { useDispatch } from "react-redux";
import { updatePet } from "../../redux/petSlice";
import Fight from "../../../assets/Fight.svg";
const ELEMENT_SYMBOL: { [index: string]: any } = {
  fire: Fire,
  leaf: Leaf,
  water: Water,
  stone: Stone,
  iron: Iron,
};
export default function DetailOfPet(props: any) {
  const [data, setData] = useState({ ...props.route.params });

  const [isStaticModalVisible, setIsStaticModalVisible] = useState(false);
  const navigate = useCustomNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    logger.error("data ", data);
  }, []);

  axios;
  return (
    <View
      style={{
        backgroundColor: COLOR.PURPLE,
        height: ConstantsResponsive.MAX_HEIGHT,
        width: ConstantsResponsive.MAX_WIDTH,
        display: "flex",
      }}
    >
      <Image
        resizeMode="stretch"
        source={require("../../../assets/backGroundForInventory.png")}
        style={{
          position: "absolute",
          width: ConstantsResponsive.MAX_WIDTH,
        }}
      />
      <View
        style={{
          width: "100%",
          height: "40%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        {data.petImg ? (
          <Image source={{ uri: data.petImg }} alt="" style={styles.petImage} />
        ) : (
          <Image source={{ uri: data.petImg }} alt="" style={styles.petImage} />
        )}
      </View>
      <CustomText
        style={{
          color: COLOR.WHITE,
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "right",
          paddingEnd: 10,
        }}
      >
        {data.name ? data.name : "BROWN BEAR"}
      </CustomText>

      <View
        style={[
          styles.levelContainer,
          {
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            marginVertical: 20,
            width: ConstantsResponsive.MAX_WIDTH,
            height: ConstantsResponsive.MAX_HEIGHT / 30,
          },
        ]}
      >
        <CustomText
          style={{ fontSize: 20, color: COLOR.WHITE, fontWeight: "bold" }}
        >
          Level {data.level}
        </CustomText>

        {data.element ? (
          <Image
            source={ELEMENT_SYMBOL[data.element]}
            style={{
              width: "10%",
              aspectRatio: 1,
            }}
          />
        ) : null}
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
          marginTop: 10,
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
            <CustomText style={{ color: COLOR.WHITE, fontSize: 18 }}>
              Healthpoint
            </CustomText>
            <CustomText style={{ color: COLOR.WHITE, fontSize: 18 }}>
              {data.healthPoint ? data.healthPoint : 20}
            </CustomText>
          </View>
          <View
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.8,
              height: ConstantsResponsive.MAX_HEIGHT / 40,
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
          marginTop: 10,
        }}
      >
        <Damage width={30} height={30} />
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <CustomText style={{ color: COLOR.WHITE, fontSize: 18 }}>
              Damage
            </CustomText>
            <CustomText style={{ color: COLOR.WHITE, fontSize: 18 }}>
              {data.damage ? data.damage : 10}
            </CustomText>
          </View>
          <View
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.8,
              height: ConstantsResponsive.MAX_HEIGHT / 40,
              backgroundColor: COLOR.CYAN,
              borderRadius: 10,
            }}
          ></View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          dispatch(updatePet(data));
          navigate.goBack();
        }}
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        <Fight
          width={ConstantsResponsive.MAX_WIDTH * 0.7}
          height={ConstantsResponsive.MAX_HEIGHT * 0.1}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  petNameTitle: {
    fontSize: 40,
    color: COLOR.WHITE,
    // fontFamily: "mrt-mid",
  },
  hpTitle: {
    fontSize: 30,
    color: COLOR.RED,
    // fontFamily: "mrt-mid",
  },
  damgeTitle: {
    fontSize: 30,
    color: COLOR.GRAY,
    // fontFamily: "mrt-mid",
  },
  hpContainer: {
    width: "50%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  hpBar: {
    width: 100,
    height: 15,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLOR.RED,
  },
  damageContainer: {
    width: "60%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  damageBar: {
    width: 100,
    height: 15,
    backgroundColor: COLOR.GRAY2,
  },
  petContainer: {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  equipmentContainer: {
    width: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  petImage: {
    width: "60%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLOR.YELLOW,
  },
  levelContainer: {
    width: "100%",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  levelTitle: {
    fontSize: 30,
    color: COLOR.WHITE,
    // fontFamily: "mrt-mid",
  },
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },
});
