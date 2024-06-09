// AlertComponent.tsx
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Button,
} from "react-native";
import { COLOR } from "../utils/color";
import ConstantsResponsive from "../constants/Constanst";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { showAlert, hideAlert, selectAlert } from "../redux/alertSlice";
import CustomText from "./CustomText";
import medicine from "../../assets/backGroundItem.png";
import GradientButton from "./Button/GradientButton";
import { height } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import NormalButton from "./Button/NormalButton";

interface AlertBuyComponentProps {
  isVisible?: boolean;
  onClose?: () => void;
  message?: string;
  description?: string;
}

const AlertBuyComponent: React.FC<AlertBuyComponentProps> = ({
  isVisible,
  onClose,
  message,
  description,
}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideAlert());
    onClose?.();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={handleCancel}>
      <View
        className="relative flex w-full flex-col items-center bg-opacity-[0%] "
        style={styles.container}
      >
        <View
          style={styles.imgContainer}
          className="relative items-center justify-center"
        >
          <Image resizeMode="stretch" source={medicine} style={styles.img} />
          <CustomText
            className="absolute mt-3 text-start font-rexlia text-[40px]"
            style={{ color: COLOR.BRIGHT_YELLOW }}
          >
            {message || "Rare food"}
          </CustomText>
        </View>
        <View
          className="absolute top-[35%] w-full flex-col  "
          style={styles.container2}
        >
          <Image
            resizeMode="stretch"
            style={{
              position: "absolute",
              height: styles.container2.height,
              width: styles.container2.width,
              borderRadius: styles.container2.borderRadius,
            }}
            source={require("../../assets/backGroundForInventory.png")}
          />
          <CustomText
            className="mt-3 text-start font-rexlia  text-[20px]"
            style={{ color: COLOR.BLACK }}
          >
            {description || "Use: up to 10 point per items"}
          </CustomText>
          <View
            className="flex w-full items-center justify-center "
            style={styles.containerBuy}
          >
            <NormalButton onPress={handleCancel} style={styles.buttonBuy}>
              <Image
                source={require("../../assets/backGroundButtonRed.png")}
                resizeMode="stretch"
                style={{ width: "100%", height: "100%", position: "absolute" }}
              />
              <Text
                className="text-center text-[20px]"
                style={{ fontWeight: "bold", color: COLOR.WHITE }}
              >
                250
              </Text>
            </NormalButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertBuyComponent;

const styles = StyleSheet.create({
  container: {
    height: ConstantsResponsive.MAX_HEIGHT / 2.5,
    borderRadius: ConstantsResponsive.XR * 60,
  },
  imgContainer: {
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 65,
    borderRadius: ConstantsResponsive.XR * 30,
    height: (ConstantsResponsive.MAX_HEIGHT / 2.5) * 0.5,
  },
  img: {
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 65,
    borderTopLeftRadius: ConstantsResponsive.XR * 60,
    borderTopRightRadius: ConstantsResponsive.XR * 60,
    height: (ConstantsResponsive.MAX_HEIGHT / 2.5) * 0.5,
  },
  container2: {
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 65,
    borderRadius: ConstantsResponsive.XR * 60,
    height: (ConstantsResponsive.MAX_HEIGHT / 2.5) * 0.65,
    padding: ConstantsResponsive.XR * 30,
  },
  containerBuy: {
    position: "absolute",
    bottom: ConstantsResponsive.YR * 30,
    left: ConstantsResponsive.XR * 30,
  },
  buttonBuy: {
    width: ConstantsResponsive.MAX_WIDTH * 0.4,
    height: ConstantsResponsive.MAX_WIDTH * 0.1,
    justifyContent: "center",
  },
});
