import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { COLOR } from "../../utils/color";
import ConstantsResponsive from "../../constants/Constanst";
import AwesomeButton from "react-native-really-awesome-button";
import log from "../../logger/index.js";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import CloseButton from "../../../assets/carbon_close-filled.svg";
import CustomText from "../../components/CustomText";
import DiamondGameBg from "../../../assets/DiamondGameBg.jpg";
import wordMaster from "../../../assets/wordMaster.png";
import { width } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { SocketIOClient } from "../../../socket";
import { GAMETYPE } from "../../constants/types";

const ChooseGameModal = ({
  isVisible,
  setIsVisible,
  setGameName,
}: {
  isVisible: boolean;
  setGameName: (content: string) => void;
  setIsVisible: (value: boolean) => void;
}) => {
  const socket = SocketIOClient.getInstance();
  const navigate = useCustomNavigation();
  useEffect(() => {}, [isVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT,

          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 99,
          paddingVertical: 50,
        }}
      >
        <Image
          resizeMode="stretch"
          source={require("../../../assets/backGroundForInventory.png")}
          style={{
            position: "absolute",
            width: ConstantsResponsive.MAX_WIDTH,
            height: ConstantsResponsive.MAX_HEIGHT,
          }}
        />
        <View
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            height: "auto",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingEnd: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
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
            style={{
              color: COLOR.WHITE,
              fontSize: 30,
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "rexlia",
            }}
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

                    setGameName(GAMETYPE.DIAMONDPUZZLE);
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
                style={{
                  color: COLOR.WHITE,
                  fontSize: 20,
                  marginTop: 5,
                  fontFamily: "rexlia",
                }}
              >
                {GAMETYPE.DIAMONDPUZZLE}
              </CustomText>
              <CustomText
                style={{
                  color: COLOR.WHITE,
                  fontSize: 20,
                  fontFamily: "rexlia",
                }}
              >
                1,0000
              </CustomText>
            </View>
            <View>
              <View style={{ width: 150, height: 180, borderRadius: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);

                    setGameName(GAMETYPE.WORDMASTER);
                  }}
                  style={{ flex: 1 }}
                >
                  <Image
                    source={wordMaster}
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
                style={{
                  color: COLOR.WHITE,
                  fontSize: 20,
                  marginTop: 5,
                  fontFamily: "rexlia",
                }}
              >
                {GAMETYPE.WORDMASTER}
              </CustomText>
              <CustomText
                style={{
                  color: COLOR.WHITE,
                  fontSize: 20,
                  fontFamily: "rexlia",
                }}
              >
                1,512
              </CustomText>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ChooseGameModal;
