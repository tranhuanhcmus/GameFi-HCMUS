import { useEffect, useState } from "react";
import { Animated, Image, TouchableOpacity, View } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Pet from "../../../assets/avatar.png";
import Plus from "../../../assets/plus.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import logger from "../../logger";
import { COLOR } from "../../utils/color";
import UnknownCard from "../../../assets/UnknowCard.svg";
import Card from "../../../assets/BearCard.svg";
const BearCard = (props: any) => {
  useEffect(() => {
    logger.warn("BearCard ", props);
  }, []);

  const [animatedValue] = useState(new Animated.Value(0));
  const navigate = useCustomNavigation();

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Callback function after the sequence finishes
      setTimeout(startShakeAnimation, 2000); // Restart after 2 seconds
    });
  };

  useEffect(() => {
    // Start the animation with a 2-second delay
    setTimeout(startShakeAnimation, 2000);
  }, []);
  return props && props.name ? (
    <Animated.View
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.3,
        position: "relative",
        transform: [{ translateX: animatedValue }],
      }}
    >
      <Card width={"100%"} height={"100%"} />
      <View
        style={{
          width: "100%",
          position: "absolute",
          height: "20%",

          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            fontWeight: "bold",
            color: COLOR.WHITE,
            fontSize: ConstantsResponsive.YR * 20,
          }}
        >
          {props.name ? props.name : "FIRE BEAR"}
        </CustomText>
      </View>

      <View
        style={{
          position: "absolute",
          top: "25%",
          width: "100%",
          alignItems: "center",
        }}
      >
        <CustomText
          style={{
            color: "#972E28",
            fontWeight: "bold",
            fontSize: ConstantsResponsive.YR * 20,
          }}
        >
          {props.rarity ? props.rarity : "EPIC"}
        </CustomText>
      </View>

      <View
        style={{
          width: "100%",
          height: "35%",

          position: "absolute",
          alignItems: "center",
          justifyContent: "center",

          top: "40%",
        }}
      >
        <Image
          source={props.image ? { uri: props.image } : Pet}
          style={{
            width: ConstantsResponsive.MAX_HEIGHT * 0.3 * 0.25,
            height: ConstantsResponsive.MAX_HEIGHT * 0.3 * 0.25,
            borderRadius: 100,
          }}
        />
      </View>

      <CustomText
        style={{
          textAlign: "center",
          fontWeight: "900",
          position: "absolute",
          top: "80%",
          alignSelf: "center",
          fontSize: ConstantsResponsive.YR * 20,
          color: COLOR.WHITE,
        }}
      >
        LEVEL {props.level ? props.level : 1}
      </CustomText>
    </Animated.View>
  ) : (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={() => {
        navigate.navigate("Play", { isBreed: true });
      }}
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.3,
      }}
    >
      <UnknownCard width={"100%"} height={"100%"} />
    </TouchableOpacity>
  );
};

export default BearCard;
