import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import FastImage from "react-native-fast-image";
import { updatePet } from "../redux/petSlice";
import React from "react";

import Egg from "../../assets/SVGEgg.svg";

import { ELEMENT } from "../constants/types";
import useCustomNavigation from "../hooks/useCustomNavigation";
import CustomText from "./CustomText";
import { COLOR } from "../utils/color";
import ConstantsResponsive from "../constants/Constanst";
import { useDispatch } from "react-redux";

interface PetCardProps {
  petImg: string;
  element: string;
  level: number;
  name: string;
  rarityPet: string;
  isBreed: boolean; // CHECK IF THIS PET CHOOSE TO BREED
  tokenUri: string;
  item: any;
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
  item,
  tokenUri,
  attributes,
  onPress,
}) => {
  const navigate = useCustomNavigation();
  const dispatch = useDispatch();
  const translateYValue = new Animated.Value(0);
  const placeholderImage = "https://via.placeholder.com/150";
  console.log(petImg);
  return (
    <TouchableOpacity
      onPress={() => {
        Animated.sequence([
          Animated.timing(translateYValue, {
            toValue: 10,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(translateYValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (isBreed) {
            onPress(null);
          } else {
            console.log(item);
            dispatch(
              updatePet({
                ...item,
                active: false,

                attributes: { ...item.attributes },
              }),
            );
          }
        });
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: styles.borderContainer.height,
        width: styles.borderContainer.width,
      }}
    >
      <Image
        source={require("../../assets/border.png")}
        resizeMode="stretch"
        style={styles.borderContainer}
      />
      <View
        style={{
          width:
            ConstantsResponsive.MAX_WIDTH / 2 - ConstantsResponsive.XR * 70,
          height:
            ConstantsResponsive.MAX_WIDTH / 2 -
            ConstantsResponsive.XR * 70 +
            ConstantsResponsive.YR * 30,
          borderRadius: ConstantsResponsive.XR * 20,
          padding: ConstantsResponsive.XR * 20,
          backgroundColor: COLOR.BROWN_BORDER,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: "15%",
            width: "100%",
            marginBottom: 5,
          }}
        >
          {ELEMENT.FIRE === element && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/Fire.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.IRON === element && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/Iron.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.LEAF === element && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/Leaf.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.STONE === element && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/Stone.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.WATER === element && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/Water.png")}
              style={{ width: 19, height: 19 }}
            />
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              height: ConstantsResponsive.YR * 35,
              width: ConstantsResponsive.XR * 35,
            }}
          >
            <Egg
              height={ConstantsResponsive.YR * 35}
              width={ConstantsResponsive.XR * 35}
            ></Egg>
            <CustomText
              style={{
                // fontFamily: "mt-2",
                position: "absolute",
                fontWeight: "bold",
                fontSize: ConstantsResponsive.YR * 20,
              }}
            >
              {Math.floor(level)}
            </CustomText>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: "100%", height: "70%" }}
            resizeMode="contain"
            source={{ uri: petImg || placeholderImage }}
          />
          <CustomText
            style={{
              // fontFamily: "mrt-mid",
              fontFamily: "rexlia",
              fontWeight: "bold",
              color: COLOR.WHITE,
              fontSize: ConstantsResponsive.YR * 25,
              marginTop: 5,
            }}
          >
            {name}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    width: ConstantsResponsive.MAX_WIDTH / 2 - ConstantsResponsive.XR * 30,
    height:
      ConstantsResponsive.MAX_WIDTH / 2 -
      ConstantsResponsive.XR * 30 +
      ConstantsResponsive.YR * 30,
    position: "absolute",
  },
});

export default PetCard;
