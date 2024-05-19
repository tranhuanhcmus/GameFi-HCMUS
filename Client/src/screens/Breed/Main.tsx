import axios from "axios";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import PetAvatar from "../../../assets/Pet.png";
import backGroundImage from "../../../assets/background3.png";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { COLOR } from "../../utils/color";
import Egg from "../../../assets/Egg.png";
import Hourglass from "../../../assets/Hourglass.png";

const URL = "http://192.168.1.14:4500"; // YOU CAN CHANGE THIS.

const Pet = (props: any) => {
  const { name, image } = props;
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: COLOR.DARKER_PURPLE,
        paddingTop: 10,
        borderRadius: 10,
        width: "40%",
        height: "auto",
      }}
    >
      <View
        style={{
          width: "70%",
          aspectRatio: 1,
          borderRadius: 100,
          backgroundColor: COLOR.WHITE,
          marginBottom: 10,
        }}
      >
        <Image
          source={image}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View
        style={{
          width: "auto",
          height: "auto",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            color: COLOR.WHITE,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {name}
        </CustomText>
      </View>
    </View>
  );
};

export function BreedScreen() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "White bear",
      image: PetAvatar,
    },
    {
      id: 2,
      name: "Brown bear",
      image: PetAvatar,
    },
  ]);
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
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT,
        backgroundColor: COLOR.PURPLE,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "30%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 40,
        }}
      >
        {data
          ? data.map((item, index) => (
              <Pet key={index} name={item.name} image={item.image}></Pet>
            ))
          : null}
      </View>

      <Image
        source={Egg}
        style={{
          width: ConstantsResponsive.MAX_WIDTH / 6,
          height: ConstantsResponsive.MAX_WIDTH / 6,
          alignSelf: "center",
          marginVertical: 20,
        }}
      />
      <View
        style={{
          alignItems: "center",
          width: ConstantsResponsive.MAX_WIDTH,
          height: "auto",
        }}
      >
        <Pet name="Brown bear" image={PetAvatar}></Pet>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          source={Hourglass}
          style={{
            width: ConstantsResponsive.MAX_WIDTH / 20,
            height: ConstantsResponsive.MAX_HEIGHT / 20,
          }}
        />
        <CustomText
          style={{ textAlign: "center", color: COLOR.WHITE, fontSize: 20 }}
        >
          10 min
        </CustomText>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
        <AwesomeButton
          style={{ justifyContent: "center", alignSelf: "center" }}
          onPress={() => {
            breedFunction(null, null);
            // navigate.navigate("DetailOfPet");
          }}
          width={225}
          height={65}
          borderRadius={20}
          backgroundColor={COLOR.GREEN}
        >
          <CustomText
            style={{ textAlign: "center", color: COLOR.WHITE, fontSize: 20 }}
          >
            MAKE BEAR
          </CustomText>
        </AwesomeButton>
      </View>
    </View>
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
