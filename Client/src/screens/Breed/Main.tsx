import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusBarHeight } from "../../function/CalculateStatusBar";

import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { COLOR } from "../../utils/color";
import Egg from "../../../assets/Egg.png";
import Hourglass from "../../../assets/Hourglass.png";
import Plus from "../../../assets/Plus.png";
import QuestionMark from "../../../assets/Question.png";
import { useSelector } from "react-redux";
import log from "../../logger/index";
import SpriteSheet from "rn-sprite-sheet";
import Breed from "../../../assets/breed.svg";
import BackIcon from "../../../assets/backIcon.svg";
import BearCard from "./BearCard";
import { BreedService } from "../../services/BreedService";
import NormalButton from "../../components/Button/NormalButton";
import AwesomeButton from "react-native-really-awesome-button";
import BabyCard from "./BabyCard";
const URL = "http://192.168.1.12:4500"; // YOU CAN CHANGE THIS.

const TIME_TO_BREED = 10;
export function BreedScreen() {
  const { fatherPet, motherPet } = useSelector((state: any) => state.breed);
  const [childPet, setChildPet] = useState<any>(null);

  const [remainingTime, setRemainingTime] = useState(TIME_TO_BREED);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const backTranslateYValue = new Animated.Value(0);
  const hourglassRotateValue = new Animated.Value(0);
  const spin = hourglassRotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  useEffect(() => {
    let intervalId: any;
    if (isActive) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [isActive]);

  useEffect(() => {
    if (remainingTime === 0) {
      if (fatherPet.id && fatherPet.id) {
        breedFunction(fatherPet.id, fatherPet.id);
        setIsOpen(true);
      }
      setIsActive(false); // Reset isActive state when time finishes
    }
  }, [remainingTime]);

  const navigate = useCustomNavigation();

  useEffect(() => {
    log.info("fatherPet", fatherPet);
    log.info("motherPet", motherPet);
  }, [fatherPet, motherPet]);

  /**
   *
   * @param father
   * @param mother
   */

  const breedFunction = async (father: any, mother: any) => {
    log.error("father", father);
    log.error("mother", mother);

    try {
      const response = await BreedService.breed(father, mother);
      if (response) {
        log.warn("A baby born ", response.data);
        setChildPet(response.data);
      } else {
        log.warn("A baby is not born");
      }
    } catch (postError: any) {
      log.error("Error making POST request:", postError);
    }
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(hourglassRotateValue, {
        toValue: 1,
        tension: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(hourglassRotateValue, {
        toValue: 0,
        tension: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [remainingTime]);

  return (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT,
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
      <TouchableWithoutFeedback
        onPress={() => {
          Animated.sequence([
            Animated.timing(backTranslateYValue, {
              toValue: 10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(backTranslateYValue, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start(() => {
            navigate.goBack();
          });
        }}
      >
        <Animated.View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: StatusBarHeight * 0.3,
            paddingLeft: ConstantsResponsive.MAX_WIDTH * 0.05,
            transform: [{ translateY: backTranslateYValue }],
          }}
        >
          <BackIcon
            height={ConstantsResponsive.MAX_HEIGHT * 0.1}
            width={ConstantsResponsive.MAX_WIDTH * 0.1}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <BearCard
            element={fatherPet.element}
            level={fatherPet.level}
            image={fatherPet.petImg}
            name={fatherPet.name}
            rarity={fatherPet.rarityPet}
            tokenUri={fatherPet.tokenUri}
          />
          <BearCard
            element={motherPet.element}
            level={motherPet.level}
            image={motherPet.petImg}
            name={motherPet.name}
            rarity={motherPet.rarityPet}
            tokenUri={fatherPet.tokenUri}
          />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Breed
            height={ConstantsResponsive.MAX_HEIGHT * 0.12}
            width={ConstantsResponsive.MAX_WIDTH * 0.12}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            width: ConstantsResponsive.MAX_WIDTH,
            height: "auto",
          }}
        >
          <BabyCard
            disabled={true}
            hp={childPet?.hp}
            atk={childPet?.atk}
            element={childPet?.element}
            description={childPet?.description}
            image={childPet?.image}
            name={childPet?.name}
            assets={childPet?.assets}
            isOpen={isOpen}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Animated.sequence([
                Animated.timing(backTranslateYValue, {
                  toValue: 10,
                  duration: 100,
                  useNativeDriver: true,
                }),
                Animated.timing(backTranslateYValue, {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: true,
                }),
              ]).start(() => {
                navigate.goBack();
              });
            }}
          >
            <Animated.View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: StatusBarHeight * 0.3,
                transform: [{ rotateX: spin }],
                marginRight: ConstantsResponsive.MAX_WIDTH * 0.05,
              }}
            >
              <Image
                source={require("../../../assets/Hourglass.png")}
                style={{
                  height: ConstantsResponsive.MAX_HEIGHT * 0.09,
                  width: ConstantsResponsive.MAX_WIDTH * 0.09,
                }}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <AwesomeButton
            onPress={() => {
              if (remainingTime == 0) {
                // navigate.navigate("Pet");
                navigate.goBack();
              }

              if (fatherPet.id && motherPet.id) {
                setIsActive(true);
              }
            }}
            width={ConstantsResponsive.MAX_WIDTH * 0.3}
            height={ConstantsResponsive.MAX_WIDTH * 0.2}
            backgroundColor={COLOR.RED}
            backgroundDarker={COLOR.BROWN}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              marginTop: 10,
            }}
            disabled={isActive}
          >
            {remainingTime > 0 ? (
              <CustomText style={{ color: COLOR.WHITE, textAlign: "center" }}>
                BREED {minutes > 0 ? `${minutes} m ` : ""}:
                {seconds.toString().padStart(2, "0")} s
              </CustomText>
            ) : (
              <CustomText style={{ color: COLOR.WHITE, textAlign: "center" }}>
                PICK UP
              </CustomText>
            )}
          </AwesomeButton>
        </View>
      </ScrollView>
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
