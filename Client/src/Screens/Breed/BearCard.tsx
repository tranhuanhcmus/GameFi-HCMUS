import { View, Image, TouchableOpacity } from "react-native";
import ConstantsResponsive from "../../constants/Constanst";
import { COLOR } from "../../utils/color";
import Plus from "../../../assets/plus.svg";
import AwesomeButton from "react-native-really-awesome-button";
import CustomText from "../../components/CustomText";
import Pet from "../../../assets/avatar.png";
import useCustomNavigation from "../../hooks/useCustomNavigation";

const BearCard = (props: any) => {
  const navigate = useCustomNavigation();
  return props && props.name ? (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.4,
        backgroundColor: COLOR.SKY,
        borderWidth: 4,
        borderColor: COLOR.LIGHT_PURPLE,
        borderRadius: 15,
        elevation: 100,
      }}
    >
      <AwesomeButton
        onPress={() => {}}
        backgroundDarker={COLOR.DARKER_PURPLE}
        backgroundColor={COLOR.PURPLE1}
        width={ConstantsResponsive.MAX_WIDTH * 0.4 - 8}
        height={ConstantsResponsive.MAX_HEIGHT * 0.08}
        borderRadius={10}
      >
        FIRE BEAR
      </AwesomeButton>
      <View
        style={{
          width: "100%",
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomText
          style={{
            color: COLOR.PURPLE,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          EPIC
        </CustomText>
        <Image source={Pet} />
      </View>
      <View
        style={{
          width: "100%",
          flexGrow: 1,
          backgroundColor: COLOR.BLUE1,
          justifyContent: "center",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <CustomText
          style={{
            textAlign: "center",
            fontWeight: "900",
            color: COLOR.WHITE,
          }}
        >
          LEVEL 1
        </CustomText>
      </View>
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("Play");
      }}
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.MAX_HEIGHT * 0.4,
        backgroundColor: COLOR.DARKER_PURPLE,
        borderWidth: 4,
        borderColor: COLOR.LIGHT_PURPLE,
        borderRadius: 10,
        elevation: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Plus width="60%" height="60%" fill={COLOR.PURPLE} />
    </TouchableOpacity>
  );
};

export default BearCard;
