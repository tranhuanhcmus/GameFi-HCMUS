import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLOR } from "../../utils/color";
import ConstantsResponsive from "../../constants/Constanst";
import AwesomeButton from "react-native-really-awesome-button";
import log from "../../logger/index.js";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import CloseButton from "../../../assets/carbon_close-filled.svg";
import CustomText from "../../components/CustomText";
import DiamondGameBg from "../../../assets/DiamondGameBg.jpg";
import HangmanBg from "../../../assets/HangmanBg.png";
import { width } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
const ChooseGameModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) => {
  const navigate = useCustomNavigation();
  useEffect(() => {}, [isVisible]);

  return isVisible ? (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT,
        backgroundColor: COLOR.PURPLE,
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 99,
        paddingVertical: 50,
      }}
    >
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "auto",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            // TODO
            console.log("Close this modal pls");
          }}
        >
          <CloseButton></CloseButton>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "auto",
        }}
      >
        <CustomText
          style={{ color: COLOR.WHITE, fontSize: 30, textAlign: "center" }}
        >
          CHOOSE GAME
        </CustomText>
      </View>
      <ScrollView
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          flexGrow: 1,
        }}
      >
        {/* ROW OF 2 GAMES */}
        <View
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View>
            <View style={{ width: 150, height: 180, borderRadius: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                }}
                style={{ flex: 1 }}
              >
                <Image
                  source={DiamondGameBg}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
            <CustomText
              style={{ color: COLOR.WHITE, fontSize: 20, marginTop: 5 }}
            >
              Diamond crash
            </CustomText>
            <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
              1,0000
            </CustomText>
          </View>
          <View>
            <View style={{ width: 150, height: 180, borderRadius: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                }}
                style={{ flex: 1 }}
              >
                <Image
                  source={HangmanBg}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
            <CustomText
              style={{ color: COLOR.WHITE, fontSize: 20, marginTop: 5 }}
            >
              Hangman
            </CustomText>
            <CustomText style={{ color: COLOR.WHITE, fontSize: 20 }}>
              1,512
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </View>
  ) : null;
};

export default ChooseGameModal;
