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
import BackIcon from "../../../assets/backIcon.svg";
import useCustomNavigation from "../../hooks/useCustomNavigation";

const ProfileScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigation = useNavigation();

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const backTranslateYValue = new Animated.Value(0);
  const navigate = useCustomNavigation();

  useEffect(() => {
    scrollToBottom();
  }, []);
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
          height: ConstantsResponsive.MAX_HEIGHT * 0.3,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AwesomeButton
          onPress={() => {
            if (isConnected) {
              setIsConnected(false);
            } else {
              setIsConnected(true);
            }
          }}
          width={ConstantsResponsive.MAX_WIDTH * 0.8}
          backgroundColor={COLOR.BLUE}
          backgroundDarker={COLOR.DARK_YELLOW}
        >
          View wallet
        </AwesomeButton>
        <AwesomeButton
          onPress={() => {}}
          width={ConstantsResponsive.MAX_WIDTH * 0.8}
          backgroundColor={COLOR.RED_BG_BUTTON}
          backgroundDarker={COLOR.SHADOW_BROWN}
        >
          LOG OUT
        </AwesomeButton>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
