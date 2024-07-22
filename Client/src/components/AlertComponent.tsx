// AlertComponent.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { showAlert, hideAlert, selectAlert } from "../redux/alertSlice";
import CustomText from "./CustomText";

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
    console.log("OK Pressed");
    dispatch(hideAlert());
  };

  return (
    <Modal
      isVisible={isVisible || isAlertVisible}
      onBackdropPress={handleCancel}
    >
      <View className="rounded-xl bg-purple-800 bg-opacity-[0%]  p-5">
        <CustomText
          // style={{
          //   fontSize: 18,
          //   marginBottom: 10,
          //   fontWeight: "900",

          //   fontFamily: "rexlia",
          //   color: "white",
          // }}
          className="font-rexlia text-[40px] text-white"
        >
          {title || "Custom Alert Title"}
        </CustomText>
        <CustomText
          style={{
            fontSize: 16,
            marginBottom: 20,
            color: "white",
            fontFamily: "mrt-mid",
          }}
        >
          {message || "Your custom alert message goes here."}
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={handleCancel} className="mr-2 p-[10px]">
            <CustomText className="text-[16px] text-red-600">Cancel</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOk} className="p-[10px]">
            <CustomText className="text-[15px] text-green-700">OK</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertComponent;
