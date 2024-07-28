import React, { useEffect, useRef, useState } from "react";
import ConstantsResponsive from "../../constants/Constanst";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { ItemComponent } from "../../components/ItemComponent";
import { ELEMENT } from "../../constants/types";
import CustomText from "../../components/CustomText";
import AlertBuyComponent from "../../components/AlertBuyComponent";
import woodSign from "../../../assets/WoodSign3.png";
import { flare } from "viem/chains";
import { COLOR } from "../../utils/color";
import Lucky from "../../../assets/medicine.png";
import Medicine from "../../../assets/medicine.svg";
import AwesomeButton from "react-native-really-awesome-button";
import { width } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBarHeight } from "../../function/CalculateStatusBar";
import BackIcon from "../../../assets/BackIcon.svg";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { useAccount, useDisconnect } from "wagmi";
import NormalButton from "../../components/Button/NormalButton";

const ProfileScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { isDisconnected } = useAccount();
  const navigation = useNavigation();

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const backTranslateYValue = new Animated.Value(0);
  const navigate = useCustomNavigation();

  const { disconnect } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (isDisconnected) {
      navigate.navigate("Connect");
    }
  }, [isDisconnected]);
  return (
    <ScrollView
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
          height: ConstantsResponsive.MAX_HEIGHT,
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
            marginLeft: ConstantsResponsive.XR * 30,
            marginTop: StatusBarHeight,

            width: ConstantsResponsive.XR * 70,

            height: ConstantsResponsive.XR * 70,
            transform: [{ translateY: backTranslateYValue }],
          }}
        >
          <Image
            style={{
              position: "absolute",
              borderRadius: ConstantsResponsive.YR * 16,
              width: "100%",
              padding: ConstantsResponsive.XR * 12,
              height: "100%",
            }}
            resizeMode="stretch"
            source={require("../../../assets/backGroundButtonBrown-1.png")}
          />
          <Image
            style={{
              position: "absolute",
              alignSelf: "center",

              width: ConstantsResponsive.XR * 30,

              height: ConstantsResponsive.XR * 30,
            }}
            resizeMode="stretch"
            source={require("../../../assets/arrow-back-basic-svgrepo-com.png")}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      <View
        id="image_info"
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT * 0.2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/avatar.png")}
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.2,
            aspectRatio: 1,
          }}
        />
        <CustomText
          style={{ color: COLOR.WHITE, fontWeight: "bold", fontSize: 17 }}
        >
          Username
        </CustomText>
        <CustomText
          style={{ color: COLOR.WHITE, fontWeight: "100", fontSize: 17 }}
        >
          @username
        </CustomText>
      </View>

      {isConnected && <W3mAccountButton balance="show" />}

      <View
        id="bottom_button"
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT * 0.2,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <NormalButton
          onPress={() => {
            if (isConnected) {
              setIsConnected(false);
            } else {
              setIsConnected(true);
            }
          }}
          style={{
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            justifyContent: "center",
            shadowColor: COLOR.SHADOW_BROWN,

            borderRadius: ConstantsResponsive.YR * 20,
            width: ConstantsResponsive.MAX_WIDTH * 0.7,
            height: ConstantsResponsive.YR * 80,
            padding: ConstantsResponsive.XR * 12,
          }}
        >
          <Image
            style={{
              position: "absolute",
              borderRadius: ConstantsResponsive.YR * 20,

              width: ConstantsResponsive.MAX_WIDTH * 0.7,
              height: ConstantsResponsive.YR * 80,
            }}
            resizeMode="stretch"
            source={require("../../../assets/backGroundButtonBrown-1.png")}
          />
          <Text
            style={{
              fontSize: ConstantsResponsive.YR * 40,
              fontFamily: "rexlia",
              fontWeight: "900",
              textAlign: "center",

              color: COLOR.WHITE,
            }}
          >
            View wallet
          </Text>
        </NormalButton>

        <NormalButton
          onPress={handleDisconnect}
          style={{
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            justifyContent: "center",
            shadowColor: COLOR.SHADOW_BROWN,

            borderRadius: ConstantsResponsive.YR * 20,
            width: ConstantsResponsive.MAX_WIDTH * 0.7,
            height: ConstantsResponsive.YR * 80,
            padding: ConstantsResponsive.XR * 12,
          }}
        >
          <Image
            style={{
              position: "absolute",
              borderRadius: ConstantsResponsive.YR * 20,

              width: ConstantsResponsive.MAX_WIDTH * 0.7,
              height: ConstantsResponsive.YR * 80,
            }}
            resizeMode="stretch"
            source={require("../../../assets/backGroundButtonRed_1.png")}
          />
          <Text
            style={{
              fontSize: ConstantsResponsive.YR * 40,
              fontFamily: "rexlia",
              fontWeight: "900",
              textAlign: "center",

              color: COLOR.WHITE,
            }}
          >
            LOG OUT
          </Text>
        </NormalButton>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
