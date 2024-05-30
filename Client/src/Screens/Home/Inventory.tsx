import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import DiamondGameBg from "../../../assets/DiamondGameBg.jpg";
import CloseButton from "../../../assets/carbon_close-filled.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { COLOR } from "../../utils/color";
import FastImage from "react-native-fast-image";
import Medicine from "../../../assets/medicine.png";
const InventoryModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) => {
  const navigate = useCustomNavigation();
  useEffect(() => {}, [isVisible]);

  const [data, setData] = useState([
    {
      id: 1,
      image: require("../../../assets/medicine.png"),
      quantity: 2,
    },
    {
      id: 2,
      image: require("../../../assets/healing_potion.png"),
      quantity: 2,
    },
    {
      id: 3,
      image: require("../../../assets/candy/17.png"),
      quantity: 2,
    },
    {
      id: 4,
      image: require("../../../assets/candy/14.png"),
      quantity: 2,
    },
    {
      id: 5,
      image: require("../../../assets/candy/19.png"),
      quantity: 2,
    },
  ]);

  const InventoryItem = ({
    image,
    quantity,
  }: {
    image: any;
    quantity: number;
  }) => {
    return (
      <View
        style={{
          backgroundColor: COLOR.DARKER_PURPLE,
          width: ConstantsResponsive.MAX_WIDTH * 0.3,
          height: ConstantsResponsive.MAX_WIDTH * 0.4,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={image} style={{ width: 50, height: 50 }} />
        <View
          style={{
            width: "100%",
            height: "auto",
            paddingEnd: 10,
          }}
        >
          <CustomText
            style={{
              color: COLOR.WHITE,
              fontSize: 15,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            x{quantity}
          </CustomText>
        </View>
      </View>
    );
  };
  return isVisible ? (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT * 0.7,
          backgroundColor: COLOR.PURPLE,
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bottom: 0,
          borderWidth: 1,

          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            width: ConstantsResponsive.MAX_WIDTH,
            height: "10%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingEnd: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <CloseButton></CloseButton>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          numColumns={3}
          columnWrapperStyle={{
            gap: 10,
            width: "100%",
          }}
          contentContainerStyle={{
            gap: 20,
            justifyContent: "space-around",
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <InventoryItem
              image={item.image}
              quantity={item.quantity}
            ></InventoryItem>
          )}
        />
      </View>
    </Modal>
  ) : null;
};

export default InventoryModal;
