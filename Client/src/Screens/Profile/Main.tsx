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

const ProfileScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT,
        backgroundColor: COLOR.PURPLE,
      }}
    >
      {isConnected && <W3mAccountButton balance="show" />}
      <View
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
            width: ConstantsResponsive.MAX_WIDTH * 0.1,
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
      <View
        id="info_container"
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT * 0.5,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextInput
          id="first_name"
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.8,
            height: ConstantsResponsive.MAX_HEIGHT * 0.1,
            backgroundColor: COLOR.DARKER_PURPLE,
            borderRadius: 15,
            color: COLOR.WHITE,
          }}
          placeholderTextColor={COLOR.WHITE}
          placeholder="What's your first name"
          textAlign="center"
          textAlignVertical="center"
        ></TextInput>

        <TextInput
          id="last_name"
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.8,
            height: ConstantsResponsive.MAX_HEIGHT * 0.1,
            backgroundColor: COLOR.DARKER_PURPLE,
            borderRadius: 15,
            color: COLOR.WHITE,
          }}
          placeholderTextColor={COLOR.WHITE}
          placeholder="And your last name?"
          textAlign="center"
          textAlignVertical="center"
        ></TextInput>

        <TextInput
          id="gender"
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.8,
            height: ConstantsResponsive.MAX_HEIGHT * 0.1,
            backgroundColor: COLOR.DARKER_PURPLE,
            borderRadius: 15,
            color: COLOR.WHITE,
          }}
          placeholderTextColor={COLOR.WHITE}
          placeholder="Select gender"
          textAlign="center"
          textAlignVertical="center"
        ></TextInput>

        <TextInput
          id="dob"
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.8,
            height: ConstantsResponsive.MAX_HEIGHT * 0.1,
            backgroundColor: COLOR.DARKER_PURPLE,
            borderRadius: 15,
            color: COLOR.WHITE,
          }}
          placeholderTextColor={COLOR.WHITE}
          placeholder="What's your date of birth"
          textAlign="center"
          textAlignVertical="center"
        ></TextInput>
      </View>
      <View
        id="bottom_button"
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          id="first_bottom_row_button"
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <AwesomeButton
            onPress={() => {
              navigation.goBack();
            }}
            backgroundColor={COLOR.GREEN}
            backgroundDarker={COLOR.DARK_YELLOW}
          >
            Update profile
          </AwesomeButton>
          <AwesomeButton
            onPress={() => {
              navigation.goBack();
            }}
            backgroundColor={COLOR.YELLOW}
            backgroundDarker={COLOR.DARK_YELLOW}
          >
            Logout
          </AwesomeButton>
        </View>

        <AwesomeButton
          onPress={() => {
            setIsConnected(true);
          }}
          width={ConstantsResponsive.MAX_WIDTH * 0.8}
          backgroundColor={COLOR.BLUE}
          backgroundDarker={COLOR.DARK_YELLOW}
        >
          View wallet
        </AwesomeButton>
      </View>
    </View>
  );
};

export default ProfileScreen;
