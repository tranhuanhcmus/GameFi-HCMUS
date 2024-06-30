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
  const flatListRef = useRef<FlatList>(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigation = useNavigation();

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

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
      <View
        id="progress"
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT * 0.2,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          paddingLeft: ConstantsResponsive.MAX_WIDTH * 0.05,
          marginBottom: ConstantsResponsive.MAX_WIDTH * 0.05,
        }}
      >
        <CustomText
          style={{ color: COLOR.WHITE, fontWeight: "bold", fontSize: 17 }}
        >
          Secure your progress
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.9,
            height: ConstantsResponsive.MAX_HEIGHT * 0.1,
            justifyContent: "flex-start",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 20,
            paddingLeft: 10,
          }}
        >
          <Image
            source={require("../../../assets/backGroundForTableQuestion.png")}
            resizeMode="stretch"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          <Image
            source={require("../../../assets/avatar.png")}
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.1,
              height: ConstantsResponsive.MAX_WIDTH * 0.1,
            }}
          />
          <CustomText
            style={{
              color: COLOR.WHITE,
              fontWeight: "bold",
              fontSize: 17,
              marginLeft: 10,
            }}
          >
            Update Avatar & Nickname
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* <View
        id="in_game_currency"
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          paddingLeft: ConstantsResponsive.MAX_WIDTH * 0.05,
          marginBottom: ConstantsResponsive.MAX_HEIGHT * 0.05,
        }}
      >
        <CustomText
          style={{
            color: COLOR.WHITE,
            fontWeight: "bold",
            fontSize: 17,
            marginBottom: ConstantsResponsive.MAX_HEIGHT * 0.04,
          }}
        >
          In-game currencies
        </CustomText>
        <FlatList
          ref={flatListRef}
          data={[
            { id: 1, image: require("../../../assets/coin.svg"), quantity: 0 },
          ]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item) => item.id}
          horizontal={true}
          renderItem={({ item }) => (
            <View
              style={{
                width: ConstantsResponsive.MAX_WIDTH * 0.3,
                height: ConstantsResponsive.MAX_WIDTH * 0.3,
                backgroundColor: COLOR.DARKER_PURPLE,
                borderRadius: 20,
              }}
            >
              <View>
                <Image
                  source={item.image}
                  style={{
                    width: ConstantsResponsive.MAX_WIDTH * 0.2,
                    height: ConstantsResponsive.MAX_WIDTH * 0.2,
                  }}
                />
              </View>
            </View>
          )}
        />
      </View> */}

      <View
        id="inventory"
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          paddingLeft: ConstantsResponsive.MAX_WIDTH * 0.05,
        }}
      >
        <CustomText
          style={{
            color: COLOR.WHITE,
            fontWeight: "bold",
            fontSize: 17,
            marginBottom: ConstantsResponsive.MAX_HEIGHT * 0.04,
          }}
        >
          Inventory
        </CustomText>
        <View
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.9,
            height: "auto",
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.9,
              height: ConstantsResponsive.MAX_HEIGHT * 0.1,
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 20,
              paddingLeft: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: COLOR.WHITE,
              marginBottom: 5,
            }}
          >
            <Image
              source={require("../../../assets/backGroundForTableQuestion.png")}
              resizeMode="stretch"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            />
            <Image
              source={require("../../../assets/avatar.png")}
              style={{
                width: ConstantsResponsive.MAX_WIDTH * 0.1,
                height: ConstantsResponsive.MAX_WIDTH * 0.1,
              }}
            />
            <CustomText
              style={{
                color: COLOR.WHITE,
                fontWeight: "bold",
                fontSize: 17,
                marginLeft: 10,
              }}
            >
              Beasts
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.9,
              height: ConstantsResponsive.MAX_HEIGHT * 0.1,
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 20,
              paddingLeft: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: COLOR.WHITE,
              marginBottom: 5,
            }}
          >
            <Image
              source={require("../../../assets/backGroundForTableQuestion.png")}
              resizeMode="stretch"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            />
            <Image
              source={require("../../../assets/avatar.png")}
              style={{
                width: ConstantsResponsive.MAX_WIDTH * 0.1,
                height: ConstantsResponsive.MAX_WIDTH * 0.1,
              }}
            />
            <CustomText
              style={{
                color: COLOR.WHITE,
                fontWeight: "bold",
                fontSize: 17,
                marginLeft: 10,
              }}
            >
              Wallets & Token
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              width: ConstantsResponsive.MAX_WIDTH * 0.9,
              height: ConstantsResponsive.MAX_HEIGHT * 0.1,
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 20,
              paddingLeft: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: COLOR.WHITE,
            }}
          >
            <Image
              source={require("../../../assets/backGroundForTableQuestion.png")}
              resizeMode="stretch"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            />
            <Image
              source={require("../../../assets/avatar.png")}
              style={{
                width: ConstantsResponsive.MAX_WIDTH * 0.1,
                height: ConstantsResponsive.MAX_WIDTH * 0.1,
              }}
            />
            <CustomText
              style={{
                color: COLOR.WHITE,
                fontWeight: "bold",
                fontSize: 17,
                marginLeft: 10,
              }}
            >
              NFTs
            </CustomText>
          </TouchableOpacity>
        </View>
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
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
