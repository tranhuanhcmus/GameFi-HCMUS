import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";

import Egg from "../../assets/SVGEgg.svg";

import { ELEMENT } from "../constants/types";
import useCustomNavigation from "../hooks/useCustomNavigation";
import CustomText from "./CustomText";
import { COLOR } from "../utils/color";

interface PetCardProps {
  petImg: string;
  element: string;
  level: number;
  name: string;
  rarityPet: string;
  isBreed: boolean; // CHECK IF THIS PET CHOOSE TO BREED
  tokenUri: string;
  attributes: {
    element: string;
    eye: string;
    fur: string;
    item: string;
  };
  onPress: (item: any) => void;
}

const PetCard: React.FC<PetCardProps> = ({
  petImg,
  element,
  level,
  name,
  rarityPet,
  isBreed,
  tokenUri,
  attributes,
  onPress,
}) => {
  const navigate = useCustomNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (isBreed) {
          onPress(null);
        } else {
          navigate.navigate("DetailOfPet", {
            petImg,
            element,
            level,
            name,
            rarityPet,
            tokenUri,
            attributes,
          });
        }
      }}
    >
      <View
        style={{
          width: Dimensions.get("window").width / 2 - 20,
          backgroundColor: COLOR.SKY,
        }}
        className="rounded-[20px] p-[10px] "
      >
        <View className="mb-2 flex flex-row items-center justify-between">
          {ELEMENT.FIRE === element && (
            <Image
              source={require("../../assets/elements/Fire.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
          {ELEMENT.IRON === element && (
            <Image
              source={require("../../assets/elements/Iron.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
          {ELEMENT.LEAF === element && (
            <Image
              source={require("../../assets/elements/Leaf.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
          {ELEMENT.STONE === element && (
            <Image
              source={require("../../assets/elements/Stone.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
          {ELEMENT.WATER === element && (
            <Image
              source={require("../../assets/elements/Water.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Egg></Egg>
            <CustomText
              style={{
                // fontFamily: "mt-2",
                position: "absolute",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {level}
            </CustomText>
          </View>
        </View>
        <View className="overflow-hidden rounded-[10px]">
          <Image
            className=" aspect-square w-[100%]  "
            source={petImg !== "" ? { uri: petImg } : { uri: petImg }}
          />
        </View>

        <CustomText
          style={{
            // fontFamily: "mrt-mid",
            color: COLOR.WHITE,
            fontSize: 18,
            marginTop: 5,
          }}
        >
          {name}
        </CustomText>
        <CustomText
          style={{
            // fontFamily: "mrt-mid ",
            color: COLOR.WHITE,
            fontSize: 14,
            fontWeight: "100",
            textAlign: "right",
          }}
        >
          {rarityPet}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: Dimensions.get("window").width / 2 - 20,
  },
});

export default PetCard;
