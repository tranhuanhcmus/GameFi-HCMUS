import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Healthpoint from "../../../assets/Healthpoint.svg";
import Pet from "../../../assets/Pet.png"; // TODO: CHANGE LATER
import Damage from "../../../assets/Damage.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import useCustomNavigation from "../../hooks/useCustomNavigation";
export default function DetailOfPet(props: any) {
  const [data, setData] = useState({ ...props.route.params });
  const navigate = useCustomNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.informationOfPetContainer}>
        <CustomText style={styles.petNameTitle}>{data.name}</CustomText>
        <View
          style={{
            width: "100%",
            height: "30%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Healthpoint width={100} height={40} />
          <View
            style={{
              flex: 1,
              height: 25,
              backgroundColor: COLOR.RED,
              borderRadius: 5,
              marginEnd: 30,
            }}
          ></View>
        </View>
        <View
          style={{
            width: "100%",
            height: "30%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginEnd: 30,
          }}
        >
          {/* <Damage width={100} height={40} /> */}
          <View
            style={{
              flex: 1,
              height: 25,
              backgroundColor: COLOR.CYAN,
              borderRadius: 5,
              marginVertical: 10,
            }}
          ></View>
        </View>
      </View>

      <View style={[styles.petContainer, { marginBottom: 0 }]}>
        <Image
          source={data.petImg !== "" ? { uri: data.petImg } : { uri: Pet }}
          alt=""
          style={styles.petImage}
        />

        {/* <View style={styles.equipmentContainer}>
          <RoundButton
            onPress={() => {
              console.log("press");
            }}
          />
          <RoundButton
            onPress={() => {
              console.log("press");
            }}
          />
          <RoundButton
            onPress={() => {
              console.log("press");
            }}
          />
        </View> */}
      </View>

      {/* Level */}
      <View
        style={[
          styles.levelContainer,
          {
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 100,
          },
        ]}
      >
        <CustomText style={styles.levelTitle}>Level</CustomText>
        <CustomText style={styles.levelTitle}>{data.level}</CustomText>
      </View>
      <AwesomeButton
        onPress={() => {
          navigate.navigate("Play");
        }}
        backgroundDarker={COLOR.DARK_YELLOW}
        backgroundColor={COLOR.YELLOW}
        width={80}
        height={30}
        borderRadius={40}
        style={{ marginTop: 10, marginStart: 50 }}
      >
        Back
      </AwesomeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.PURPLE,
    width: "100%",
    height: "100%",
    display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "center",
  },
  informationOfPetContainer: {
    width: "100%",
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  petNameTitle: {
    fontSize: 40,
    color: COLOR.WHITE,
    fontFamily: "mrt-mid",
  },
  hpTitle: {
    fontSize: 30,
    color: COLOR.RED,
    fontFamily: "mrt-mid",
  },
  damgeTitle: {
    fontSize: 30,
    color: COLOR.GRAY,
    fontFamily: "mrt-mid",
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
    width: "70%",
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
    fontFamily: "mrt-mid",
  },
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },
});
