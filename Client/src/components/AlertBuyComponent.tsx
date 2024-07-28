// AlertComponent.tsx
import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Button,
} from "react-native";
import { COLOR } from "../utils/color";

import Coin from "../../assets/coin.svg";
import Gem from "../../assets/diamond.svg";
import ConstantsResponsive from "../constants/Constanst";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { showAlert, hideAlert, selectAlert } from "../redux/alertSlice";
import CustomText from "./CustomText";
import backgroundShop from "../../assets/backGroundItem.png";
import GradientButton from "./Button/GradientButton";
import { height } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import NormalButton from "./Button/NormalButton";
import useFetch from "../hooks/useFetch";
import { ItemGameOwnerService } from "../services/ItemGameOwnerService";
import { startLoading, stopLoading } from "../redux/loadingSlice";
import { ItemAppOwnerService } from "../services/ItemAppOwnerService";

interface AlertBuyComponentProps {
  isVisible?: boolean;
  onClose?: () => void;
  onBuy: (buy: boolean, itemImg: string, arrayItem?: any) => void;
  gemcost?: number;
  goldcost?: number;
  name?: string;
  quantity?: number | null;
  category?: string;
  itemImg?: string;
  quality?: string;
  description?: string;
  id: string | undefined;
}

interface item {
  id: string;
  owner: string;
  quantity: number;
  gemcost: number;
  goldcost: number;
  currency: number;
}

const AlertBuyComponent: React.FC<AlertBuyComponentProps> = ({
  isVisible,
  onClose,
  onBuy,
  quality,
  id,
  category,
  itemImg,
  quantity,
  name,

  gemcost,
  goldcost,
  description,
}) => {
  const dispatch = useDispatch();

  const handleBuy = async () => {
    if (
      id &&
      quality &&
      quality &&
      category &&
      gemcost &&
      goldcost != null &&
      goldcost >= 0 &&
      itemImg
    ) {
      onClose?.();
      dispatch(startLoading());
      console.log(category);
      const body: item = {
        id: id,
        owner: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        quantity: quantity || 0,
        goldcost: goldcost || 0,
        gemcost: gemcost || 0,
        currency: 1,
      };

      try {
        if (category.includes("pack")) {
          const body1 = {
            id: id,
            quality: quality,
            category: category.substring(0, category.indexOf(" ")),
            owner: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",

            quantity: quantity || 0,
            goldcost: goldcost || 0,
            gemcost: gemcost || 0,
            currency: 1,
          };
          console.log(body1);
          const response = await ItemAppOwnerService.buyItemPack(body1);
          console.log(response);

          onBuy(true, itemImg, [response]);
        } else {
          console.log(body);
          await ItemAppOwnerService.buyItem(body);

          onBuy(true, itemImg);
        }

        onClose?.();

        dispatch(stopLoading());
      } catch (error) {
        console.log(error);
        onBuy(false, itemImg || "");
        dispatch(stopLoading());
      }
    }
  };

  const handleCancel = () => {
    dispatch(hideAlert());
    onClose?.();
  };

  return (
    <Modal isVisible={isVisible}>
      <View
        className="relative flex w-full flex-col items-center bg-opacity-[0%] "
        style={styles.container}
      >
        <View style={styles.btnDelete}>
          <NormalButton
            onPress={onClose}
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/delete.png")}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
            />
          </NormalButton>
        </View>

        <View
          style={styles.imgContainer}
          className="relative items-center justify-center"
        >
          <Image
            resizeMode="stretch"
            source={backgroundShop}
            style={styles.img}
          />
          <CustomText
            className="absolute mt-3 text-start font-rexlia text-[40px]"
            style={{ color: COLOR.DARKER_PURPLE }}
          >
            {name}
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
            style={{ color: COLOR.WHITE }}
          >
            {description || "Use: up to 10 point per items"}
          </CustomText>
          <View
            className="flex w-full items-center justify-center "
            style={styles.containerBuy}
          >
            <NormalButton onPress={handleBuy} style={styles.buttonBuy}>
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
                  style={{ fontWeight: "bold", color: COLOR.WHITE }}
                >
                  BUY
                </Text>
              </View>
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
