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
import ConstantsResponsive from "../constants/Constanst";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { showAlert, hideAlert, selectAlert } from "../redux/alertSlice";
import CustomText from "./CustomText";
import medicine from "../../assets/backGroundItem.png";
import GradientButton from "./Button/GradientButton";

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
          <CustomText className="absolute mt-3 text-start text-[40px] text-white">
            {message || "Rare food"}
          </CustomText>
        </View>
        <View
          className="absolute top-[35%] mt-3 w-full flex-col bg-[#36144b]  "
          style={styles.container2}
        >
          <CustomText className="mt-3 text-start  text-[20px] text-white">
            {description || "Use: up to 10 point per items"}
          </CustomText>
          <View
            className="flex w-full items-center justify-center "
            style={styles.containerBuy}
          >
            <GradientButton
              colors={["#F7971E", "#FFD200"]}
              style={styles.buttonBuy}
              onPress={handleCancel}
            >
              <Text
                className="text-center text-[20px]"
                style={{ fontWeight: "bold" }}
              >
                250
              </Text>
            </GradientButton>
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
    width:
      ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 65 -
      ConstantsResponsive.XR * 90,
  },
});
