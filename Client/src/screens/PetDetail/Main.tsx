import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Damage from "../../../assets/thunder.svg";
import Heart from "../../../assets/Healthpoint.svg";
import Pet from "../../../assets/Pet.png";
import Fire from "../../../assets/elements/Fire.png";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import AwesomeButton from "react-native-really-awesome-button";
import { COLOR } from "../../utils/color";
import axios from "axios";

export default function DetailOfPet(props: any) {
  const [data, setData] = useState({ ...props.route.params });

  const [isStaticModalVisible, setIsStaticModalVisible] = useState(false);
  const navigate = useCustomNavigation();

  useEffect(() => {
    console.error("data ", data);
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
      <View
        style={{
          width: "100%",
          height: "40%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: COLOR.LIGHT_GREEN,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        {data.petImg ? (
          <Image source={{ uri: data.petImg }} alt="" style={styles.petImage} />
        ) : (
          <Image source={Pet} alt="" style={styles.petImage} />
        )}
      </View>
      <CustomText
        style={{
          color: COLOR.YELLOW,
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
          Level {data.level ? data.level : 1}
        </CustomText>
        <View
          style={{
            width: "50%",
            height: ConstantsResponsive.MAX_HEIGHT / 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Image
            source={Fire}
            style={{
              width: "20%",
              aspectRatio: 1,
            }}
          />
          <CustomText
            style={{ fontSize: 20, color: COLOR.WHITE, fontWeight: "bold" }}
          >
            {data.element ? data.element : "Fire"}
          </CustomText>
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

      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        <AwesomeButton
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
          onPress={() => {
            navigate.navigate("Home");
          }}
          width={ConstantsResponsive.MAX_WIDTH * 0.7}
          height={ConstantsResponsive.MAX_HEIGHT * 0.1}
          borderRadius={20}
          backgroundColor={COLOR.YELLOW}
        >
          <CustomText
            style={{
              textAlign: "center",
              color: COLOR.BLACK,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Pick to fight
          </CustomText>
        </AwesomeButton>
      </View>
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
