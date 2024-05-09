import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import backGroundImage from "../../../assets/background3.png";
import Heart from "../../../assets/heart.png";
import { RoundButton } from "../../components/Button/RoundButton";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import React, { useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import PetAvatar from "../../../assets/Pet.png";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import axios from "axios";

const URL = "http://192.168.1.14:4500"; // YOU CAN CHANGE THIS.

const Pet = () => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <View style={styles.avatar}>
        <Image
          source={PetAvatar}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.idInputBox}>
        <CustomText
          style={{
            color: COLOR.BLACK,
            fontSize: 18,
            fontWeight: "bold",
            paddingHorizontal: 10,
          }}
        >
          1234
        </CustomText>
      </View>
    </View>
  );
};

export function BreedScreen() {
  const navigate = useCustomNavigation();

  /**
   *
   * @param father
   * @param mother
   */

  const breedFunction = async (father: any, mother: any) => {
    father = { id: 1 };
    mother = { id: 1 };
    try {
      const response = await axios.post(`${URL}/tokenUris/breed`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          fatherId: father.id,
          motherId: mother.id,
        },
      });

      console.log("GET request successful:", response.data);
    } catch (postError: any) {
      console.error("Error making GET request:", postError);
    }
  };

  return (
    <SafeAreaView className="h-screen w-screen bg-[#210035]">
      <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={backGroundImage}
      />
      <View style={styles.container}>
        <CustomText style={styles.title}>Breed</CustomText>
        {/* <View className="h-[50%] w-[90%] object-cover">
          <Image source={Heart} alt="Heart" style={styles.imageContainer} />
        </View> */}

        {/* <View style={styles.addButtonContainer}>
          <RoundButton
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <RoundButton
            onPress={() => {
              console.log("Pressed");
            }}
          />
        </View> */}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70%",
          }}
        >
          <Pet></Pet>
          <FontAwesomeIcon icon={faPlus} size={40} color={COLOR.RED} />
          <Pet></Pet>
        </View>
        <AwesomeButton
          style={styles.breedButton}
          onPress={() => {
            breedFunction(null, null);
            // navigate.navigate("DetailOfPet");
          }}
          width={225}
          height={65}
          borderRadius={20}
          backgroundColor={COLOR.RED}
        >
          <CustomText
            style={{ textAlign: "center", color: COLOR.WHITE, fontSize: 20 }}
          >
            See my baby bear
          </CustomText>
        </AwesomeButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: COLOR.WHITE,
    marginBottom: 10,
  },
  idInputBox: {
    width: 231,
    height: 52,
    backgroundColor: COLOR.GRAY,
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.PURPLE,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  title: {
    fontSize: 40,
    color: COLOR.WHITE,
    fontFamily: "mrt-bold",
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  addButtonContainer: {
    width: "80%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: -30,
    zIndex: 99,
  },

  breedButton: {
    // width: 225,
    // height: 65,
    // borderRadius: 20,
    // backgroundColor: COLOR.RED,
    justifyContent: "center",
    marginTop: 22,
  },
  breedText: {
    textAlign: "center",
    color: COLOR.WHITE,
    fontSize: 28,
  },
  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },
});
