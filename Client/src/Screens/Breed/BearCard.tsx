import { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
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

  const navigate = useCustomNavigation();
  return props ? (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.4,
        position: "relative",
        alignContent: "center",
      }}
    >
      <Card width={"100%"} height={"100%"} />
      <CustomText
        style={{
          position: "absolute",
          top: "10%",
          left: ConstantsResponsive.MAX_WIDTH * 0.1,
          fontWeight: "bold",
          color: COLOR.WHITE,
        }}
      >
        {props.name ? props.name : "FIRE BEAR"}
      </CustomText>
      <CustomText
        style={{
          color: "#972E28",
          fontWeight: "bold",
          textAlign: "center",
          position: "absolute",
          top: "28%",
          left: ConstantsResponsive.MAX_WIDTH * 0.15,
        }}
      >
        {props.rarity ? props.rarity : "EPIC"}
      </CustomText>
      <Image
        source={props.image ? { uri: props.image } : Pet}
        style={{
          width: ConstantsResponsive.MAX_WIDTH * 0.2,
          height: ConstantsResponsive.MAX_WIDTH * 0.2,
          borderRadius: 100,
          position: "absolute",
          top: "40%",
          left: ConstantsResponsive.MAX_WIDTH * 0.1,
        }}
      />
      <CustomText
        style={{
          textAlign: "center",
          fontWeight: "900",
          position: "absolute",
          top: "80%",
          left: ConstantsResponsive.MAX_WIDTH * 0.135,
          color: COLOR.WHITE,
        }}
      >
        LEVEL {props.level ? props.level : 1}
      </CustomText>
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("Play", { isBreed: true });
      }}
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.4,
      }}
    >
      <UnknownCard width={"100%"} height={"100%"} />
    </TouchableOpacity>
  );
};

export default BearCard;
