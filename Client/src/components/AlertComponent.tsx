// AlertComponent.tsx
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { showAlert, hideAlert, selectAlert } from "../redux/alertSlice";
import CustomText from "./CustomText";
import NormalButton from "./Button/NormalButton";
import ConstantsResponsive from "../constants/Constanst";
import { COLOR } from "../utils/color";

interface AlertComponentProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  isVisible,
  onClose,
}) => {
  const dispatch = useDispatch();
  const {
    title,
    message,
    isVisible: isAlertVisible,
  } = useSelector(selectAlert);

  const handleCancel = () => {
    dispatch(hideAlert());
    onClose?.();
  };

  const handleOk = () => {
    dispatch(hideAlert());
  };

  return (
    <Modal
      isVisible={isVisible || isAlertVisible}
      onBackdropPress={handleCancel}
    >
      <Image
        resizeMode="stretch"
        source={require("../../assets/backGroundForInventory.png")}
        style={{
          position: "absolute",
          height: "40%",
          width: "100%",
          borderRadius: 30,
        }}
      />
      <View className="h-[40%]  w-[100%]  rounded-xl bg-opacity-[0%] p-5">
        <CustomText className="text-center font-rexlia text-[50px] text-white">
          {title || "Custom Alert Title"}
        </CustomText>
        <View
          style={{
            height: "65%",
            alignItems: "center",
          }}
        >
          <ScrollView
            style={{
              overflow: "scroll",
              display: "flex",
              height: "100%",
            }}
          >
            {message.error ? (
              <CustomText
                style={{
                  fontSize: 24,
                  marginTop: 30,
                  marginBottom: 20,
                  color: COLOR.RED,

                  fontFamily: "rexlia",
                }}
              >
                {message?.message || "Your custom alert message goes here."}
              </CustomText>
            ) : (
              <CustomText
                style={{
                  fontSize: 24,
                  marginTop: 30,
                  marginBottom: 20,
                  color: COLOR.GREEN,

                  fontFamily: "rexlia",
                }}
              >
                {message?.message || "Your custom alert message goes here."}
              </CustomText>
            )}
          </ScrollView>
        </View>

        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 10,
          }}
        >
          <View
            className="flex w-full items-center justify-center "
            style={styles.containerBuy}
          >
            <NormalButton onPress={handleOk} style={styles.buttonBuy}>
              <Image
                source={require("../../assets/backGroundButtonRed.png")}
                resizeMode="stretch"
                style={{ width: "100%", height: "100%", position: "absolute" }}
              />

              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  className="text-center text-[20px]"
                  style={{ color: COLOR.WHITE }}
                >
                  OK
                </Text>
              </View>
            </NormalButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertComponent;
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
    alignSelf: "center",
  },
  btnDelete: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 0,
    zIndex: 1000,
    right: ConstantsResponsive.XR * -20,
    width: ConstantsResponsive.XR * 80,
    height: ConstantsResponsive.XR * 80,
  },
  buttonBuy: {
    width: ConstantsResponsive.MAX_WIDTH * 0.4,
    height: ConstantsResponsive.MAX_WIDTH * 0.1,
    justifyContent: "center",
  },
});
