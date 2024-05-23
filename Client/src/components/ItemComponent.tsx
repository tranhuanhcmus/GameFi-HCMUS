import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Coin from "../../assets/coin.svg";
import Food from "../../assets/candy/14.png";
import Blood from "../../assets/medicine.svg";
import Gem from "../../assets/diamond.png";
import Lightning from "../../assets/lightning.svg";
import Lucky from "../../assets/medicine.png";
import ConstantsResponsive from "../constants/Constanst";
import { COLOR } from "../utils/color";
interface ItemProps {
  itemImg?: any;
  itemColor?: string;
  price?: any;
  onPress?: () => void;
  imgPrice?: any;
  itemAmount?: number;
  itemType?: any;
}

export const ItemComponent: React.FC<ItemProps> = ({
  itemImg,
  itemColor,
  price,
  onPress,
  imgPrice,
  itemAmount,
  itemType,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: ConstantsResponsive.MAX_WIDTH / 3 - ConstantsResponsive.XR * 20,
        borderRadius: ConstantsResponsive.XR * 20,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        flexDirection: "column",
        height:
          ConstantsResponsive.MAX_HEIGHT / 3 - 120 * ConstantsResponsive.YR,
        backgroundColor: itemColor,
        paddingTop: 2,
      }}
    >
      <View
        style={[
          styles.itemTop,
          {
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 10,
          },
        ]}
      >
        {itemType && itemType == "1" ? (
          <Image
            resizeMode="stretch"
            source={Lucky}
            style={{
              width: 30,
              height: 30,
            }}
          />
        ) : itemType && itemType == "2" ? (
          <Blood width={30} height={30} />
        ) : itemType && itemType == "3" ? (
          <Image
            resizeMode="stretch"
            source={Food}
            style={{
              width: 30,
              height: 30,
            }}
          />
        ) : itemType && itemType == "4" ? (
          <Image
            resizeMode="stretch"
            source={Gem}
            style={{
              width: 30,
              height: 30,
            }}
          />
        ) : (
          <Lightning width={30} height={30} />
        )}
        <Text
          style={{
            // fontFamily: "mt-2",
            color: COLOR.WHITE,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {itemAmount}
        </Text>
      </View>
      <View style={{ display: "flex", alignItems: "center" }}>
        {itemType && itemType == "1" ? (
          <Image
            resizeMode="stretch"
            source={Lucky}
            style={{
              width: 60,
              height: 60,
            }}
          />
        ) : itemType && itemType == "2" ? (
          <Blood width={60} height={60} />
        ) : itemType && itemType == "3" ? (
          <Image
            resizeMode="stretch"
            source={Food}
            style={{
              width: 60,
              height: 60,
            }}
          />
        ) : itemType && itemType == "4" ? (
          <Image
            resizeMode="stretch"
            source={Gem}
            style={{
              width: 60,
              height: 60,
            }}
          />
        ) : (
          <Lightning width={60} height={60} />
        )}
      </View>
      <View
        style={[
          styles.itemBottom,
          {
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 20,
            paddingBottom: 5,
          },
        ]}
      >
        <Coin
          width={styles.listContainer.width / 5}
          height={styles.itemBottom.height - 10}
        />
        <Text
          style={{
            // fontFamily: "mt-2",
            fontWeight: "bold",
            color: COLOR.WHITE,
            fontSize: 15,
          }}
        >
          {price}
        </Text>
      </View>
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
