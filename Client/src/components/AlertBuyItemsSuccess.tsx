import React, { useEffect } from "react";
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
import { hideAlert } from "../redux/alertSlice";
import { API } from "../apis/constants";
import CustomText from "./CustomText";
import ItemShowComponent from "./ItemShowComponent";
import { CATEGORY } from "../constants/types";
import { StatusBarHeight } from "../function/CalculateStatusBar";

interface AlertBuyItemsSuccessProps {
  isVisible: boolean;
  name: string;
  category: string;
  quantity: number;
  onClose: () => void;
  itemImg?: any;
}

const AlertBuyItemsSuccess: React.FC<AlertBuyItemsSuccessProps> = ({
  isVisible,
  category,
  name,
  quantity,
  itemImg,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideAlert());
    onClose?.();
  };

  return (
    <Modal isVisible={isVisible}>
      <TouchableOpacity
        className=" relative flex h-full w-full flex-col items-center justify-center"
        onPress={handleCancel}
      >
        {category == CATEGORY.FOODPACK || category == CATEGORY.PACK ? (
          <>
            <View
              style={{
                position: "absolute",
                top: StatusBarHeight + ConstantsResponsive.YR * 100,
              }}
            >
              <ItemShowComponent
                name={name}
                quantity={quantity}
                itemImg={itemImg}
              />
            </View>
            <Image
              resizeMode="contain"
              source={{ uri: API.server + itemImg }}
              style={styles.img}
            />
          </>
        ) : (
          <ItemShowComponent
            name={name}
            quantity={quantity}
            itemImg={itemImg}
          />
        )}

        <View
          style={{ position: "absolute", bottom: ConstantsResponsive.YR * 5 }}
        >
          <CustomText
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: ConstantsResponsive.YR * 25,
            }}
          >
            Press to continue...
          </CustomText>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AlertBuyItemsSuccess;

const styles = StyleSheet.create({
  container: {
    height: ConstantsResponsive.MAX_HEIGHT / 2.5,
    borderRadius: ConstantsResponsive.XR * 60,
  },

  img: {
    width: ConstantsResponsive.MAX_WIDTH / 2,

    height: ConstantsResponsive.MAX_WIDTH / 2,
  },
});
