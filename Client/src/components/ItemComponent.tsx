import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";

import useCustomNavigation from "../hooks/useCustomNavigation";
import ConstantsResponsive from "../constants/Constanst";
import Medicine from "../../assets/Medicine.svg";
import { LinearGradient } from "expo-linear-gradient";
import Coin from "../../assets/Coin.svg";
import medi from "../../assets/medicine.png";

interface ItemProps {
  itemImg?: string;
  itemColor?: string;
  price?: number;
  onPress?: () => void;
  imgPrice?: string;
  itemAmount?: number;
}

export const ItemComponent: React.FC<ItemProps> = ({
  itemImg,
  itemColor,
  price,
  onPress,
  imgPrice,
  itemAmount,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#00D2FF", "#DD2476"]}
        style={styles.listContainer}
      >
        <View
          className="relative flex flex-row items-center justify-center  "
          style={styles.itemTop}
        >
          <Medicine
            width={styles.listContainer.width / 5}
            height={styles.itemTop.height - 10}
          />
          <Text className="mt-2 font-rexlia text-[20px] text-white">
            {itemAmount} 250
          </Text>
        </View>
        <View className="flex items-center  ">
          <Medicine
            width={styles.itemMain.width}
            height={styles.itemMain.height}
          />
        </View>
        <View
          className="relative flex flex-row items-center justify-center "
          style={styles.itemBottom}
        >
          <Coin
            width={styles.listContainer.width / 5}
            height={styles.itemBottom.height - 10}
          />
          <Text className="font-rexlia text-[20px] text-white">
            {itemAmount} 250
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: ConstantsResponsive.MAX_WIDTH / 3 - ConstantsResponsive.XR * 20,
    borderRadius: ConstantsResponsive.XR * 20,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    padding: ConstantsResponsive.YR * 10,

    flexDirection: "column",
    height: ConstantsResponsive.MAX_HEIGHT / 3 - 120 * ConstantsResponsive.YR,
  },
  itemTop: {
    height: ConstantsResponsive.YR * 50,
    marginBottom: ConstantsResponsive.YR * 10,
  },
  itemBottom: {
    height: ConstantsResponsive.YR * 50,
    marginTop: ConstantsResponsive.YR * 20,
  },
  itemMain: {
    width: ConstantsResponsive.MAX_WIDTH / 3 - 20,
    height:
      ConstantsResponsive.MAX_HEIGHT / 3 -
      2 * 120 * ConstantsResponsive.YR -
      20 * ConstantsResponsive.YR,
  },
});
