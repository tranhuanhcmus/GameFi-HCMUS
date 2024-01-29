import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { COLOR } from "../utils/color";
import CustomText from "../components/CustomText";
import Pet from "../../assets/Pet.png";
import { RoundButton } from "../components/Button/RoundButton";
export default function DetailOfPet() {
  return (
    <View style={styles.container}>
      {/* Information of pet */}
      <View style={styles.informationOfPetContainer}>
        <CustomText style={styles.petNameTitle}>Pet name</CustomText>
        <View style={styles.hpContainer}>
          <CustomText style={styles.hpTitle}>HP</CustomText>
          <View style={styles.hpBar}></View>
        </View>
        <View style={styles.damageContainer}>
          <CustomText style={styles.damgeTitle}>DMG</CustomText>
          <View style={styles.damageBar}></View>
        </View>
      </View>
      {/* Image of pet */}
      <View style={styles.petContainer}>
        <Image source={Pet} alt="" style={styles.petImage} />
        <View style={styles.equipmentContainer}>
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
        </View>
      </View>

      {/* Level */}
      <View style={styles.levelContainer}>
        <CustomText style={styles.levelTitle}>Level</CustomText>
        <CustomText style={styles.levelTitle}>10</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.PURPLE,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  informationOfPetContainer: {
    width: "100%",
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 60,
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
    width: 200,
    height: 300,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLOR.YELLOW,
  },
  levelContainer: {
    width: "60%",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  levelTitle: {
    fontSize: 30,
    color: COLOR.GRAY,
    fontFamily: "mrt-mid",
  },
});
