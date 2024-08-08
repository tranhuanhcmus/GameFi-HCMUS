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

import { updatePet } from "../redux/petSlice";
import React from "react";

import Egg from "../../assets/SVGEgg.svg";

import { ELEMENT, formatElement } from "../constants/types";
import useCustomNavigation from "../hooks/useCustomNavigation";
import CustomText from "./CustomText";
import { COLOR } from "../utils/color";
import ConstantsResponsive from "../constants/Constanst";
import { useDispatch } from "react-redux";
import { getLevel } from "../utils/pet";

interface PetCardProps {
  petImg: string;

  level: number;
  name: string;

  rarityPet: string;
  isBreed?: boolean; // CHECK IF THIS PET CHOOSE TO BREED
  tokenUri: string;
  item: any;
  attributes: {
    element: number;
    eye: string;
    fur: string;
    item: string;
  };
  onPress: (item: any) => void;
}

const PetCard: React.FC<PetCardProps> = ({
  petImg,

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
            onPress(item);
          } else {
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
          justifyContent: "center",
          alignItems: "center",
          marginTop: ConstantsResponsive.YR * 5,
          padding: ConstantsResponsive.XR * 20,
          backgroundColor: COLOR.BROWN_BORDER,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            position: "absolute",
            right: ConstantsResponsive.XR * 5,
          }}
        >
          {item.energy >= 0 &&
            Array(3)
              .fill({})
              .map((value, index) =>
                item.energy == 3 ? (
                  <Image
                    key={index}
                    source={require("../../assets/navIcon/thunderBlue.png")}
                    resizeMode="contain"
                    style={{
                      height: ConstantsResponsive.XR * 32,
                      width: ConstantsResponsive.XR * 32,
                    }}
                  />
                ) : index < item.energy ? (
                  <Image
                    key={index}
                    source={require("../../assets/navIcon/thunderBlue.png")}
                    resizeMode="contain"
                    style={{
                      height: ConstantsResponsive.XR * 32,
                      width: ConstantsResponsive.XR * 32,
                    }}
                  />
                ) : (
                  <Image
                    key={index}
                    source={require("../../assets/navIcon/thunderBlack.png")}
                    resizeMode="contain"
                    style={{
                      height: ConstantsResponsive.XR * 32,
                      width: ConstantsResponsive.XR * 32,
                    }}
                  />
                ),
              )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: "20%",
            width: "100%",
            alignItems: "center",
            marginBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          {ELEMENT.FIRE === formatElement(attributes.element) && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/fire.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.DARK === formatElement(attributes.element) && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/dark.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.FOREST === formatElement(attributes.element) && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/forest.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.FROZEN === formatElement(attributes.element) && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/frozen.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.THUNDER === formatElement(attributes.element) && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/thunder.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          {ELEMENT.WATER === formatElement(attributes.element) && (
            <Image
              resizeMode="contain"
              source={require("../../assets/elements/water.png")}
              style={{ width: "20%", height: "100%" }}
            />
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              height: "100%",
            }}
          >
            <CustomText
              style={{
                // fontFamily: "mt-2",
                fontFamily: "rexlia",
                color: "white",

                fontSize: ConstantsResponsive.YR * 25,
              }}
            >
              {Math.floor(getLevel(level))}
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
            source={{ uri: petImg }}
          />
          <CustomText
            style={{
              fontFamily: "rexlia",

              color: COLOR.WHITE,
              width: "100%",
              height: "20%",

              textAlign: "center",

              fontSize: ConstantsResponsive.YR * 25,
              marginTop: ConstantsResponsive.YR * 7,
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
