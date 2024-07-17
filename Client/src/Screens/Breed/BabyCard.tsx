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
import { getLevel } from "../../utils/pet";
const BabyCard = (props: any) => {
  const [isVisble, setIsVisble] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const [scaleAnimatedValue] = useState(new Animated.Value(1)); // Create an Animated value
  const navigate = useCustomNavigation();

  const startShakeAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(animatedValue, {
          toValue: 10,
          tension: 10,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValue, {
          toValue: 0,
          tension: 10,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.spring(scaleAnimatedValue, {
          toValue: 1.05,
          tension: 10,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimatedValue, {
          toValue: 1,
          tension: 10,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setIsVisble(true);
    });
  };

  useEffect(() => {
    if (props.isOpen) startShakeAnimation();
    // Start the animation with a 2-second delay
  }, [props]);

  return isVisble ? (
    <Animated.View
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.3,
        position: "relative",
        transform: [
          { translateY: animatedValue },
          { scale: scaleAnimatedValue },
        ],
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
        LEVEL {props.level ? Math.floor(getLevel(props.level)) : 1}
      </CustomText>
    </Animated.View>
  ) : (
    <Animated.View
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.3,
        transform: [
          { translateY: animatedValue },
          { scale: scaleAnimatedValue },
        ],
      }}
    >
      <UnknownCard width={"100%"} height={"100%"} />
    </Animated.View>
  );
};

export default BabyCard;
