import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
import BearCard from "./BearCard";
import { BreedService } from "../../services/BreedService";
import NormalButton from "../../components/Button/NormalButton";
const URL = "http://192.168.1.12:4500"; // YOU CAN CHANGE THIS.

const TIME_TO_BREED = 10;
export function BreedScreen() {
  const { fatherPet, motherPet } = useSelector((state: any) => state.breed);

  const [isShowTime, setIsShowTime] = useState(false);

  const [remainingTime, setRemainingTime] = useState(TIME_TO_BREED);
  const [isActive, setIsActive] = useState(false);

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
    if (!father.tokenUri || !mother.tokenUri) {
      log.error("Invalid father or mother data for breeding");
      return; // Or handle the error differently
    }

    try {
      const dad = {
        item: father.attributes.item,
        eye: father.attributes.eye,
        fur: father.attributes.fur,
        element: father.attributes.element,
      };
      const mom = {
        item: mother.attributes.item,
        eye: mother.attributes.eye,
        fur: mother.attributes.fur,
        element: mother.attributes.element,
      };
      log.error("dad", dad);
      log.error("mom", mom);
      const response = await BreedService.breed(dad, mom);

      log.warn("POST request successful:", response);
    } catch (postError: any) {
      log.error("Error making POST request:", postError);
    }
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT - ConstantsResponsive.YR * 120,
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
      <ScrollView
        style={{
          marginTop: StatusBarHeight,
        }}
      >
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
            petImg={fatherPet.petImg}
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
        <TouchableOpacity
          onPress={() => {
            if (fatherPet.tokenUri && fatherPet.tokenUri)
              breedFunction(fatherPet, motherPet);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Breed
            height={ConstantsResponsive.MAX_HEIGHT * 0.1}
            width={ConstantsResponsive.MAX_WIDTH * 0.1}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            width: ConstantsResponsive.MAX_WIDTH,
            height: "auto",
          }}
        >
          <BearCard disabled={true} />
        </View>

        {isShowTime && (
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
        )}
        <View style={{ display: "flex", alignItems: "center" }}>
          <NormalButton
            onPress={() => {
              if (fatherPet.tokenUri && motherPet.tokenUri) setIsActive(true);
            }}
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.3,
              height: ConstantsResponsive.MAX_WIDTH * 0.2,
              backgroundColor: COLOR.RED,
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
                COMBINE {minutes > 0 ? `${minutes} m ` : ""}:
                {seconds.toString().padStart(2, "0")} s
              </CustomText>
            ) : (
              <CustomText style={{ color: COLOR.WHITE, textAlign: "center" }}>
                PICK UP
              </CustomText>
            )}
          </NormalButton>
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
