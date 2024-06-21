import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, TouchableOpacity, View } from "react-native";
import { useAccount } from "wagmi";
import CloseButton from "../../../assets/carbon_close-filled.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import { ItemGameOwnerService } from "../../services/ItemGameOwnerService";
import { COLOR } from "../../utils/color";
const InventoryModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) => {
  const [data, setData] = useState([
    {
      id: 1,
      image: require("../../../assets/banana.png"),
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

  /** useState */
  // const [data, setData] = useState<any[]>([]);

  /** useAccount */
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  // const fetchData = async () => {
  //   try {
  //     const res: any[] = await ItemGameOwnerService.getItems(address);
  //     setData([...res]);
  //   } catch (error) {
  //     console.error("ItemGameOwnerService.getItems", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [address]);

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
          width: ConstantsResponsive.MAX_WIDTH * 0.3,
          height: ConstantsResponsive.MAX_WIDTH * 0.4,
          backgroundColor: "white",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={
            image
              ? { uri: `http://192.168.1.12:4500${image}` }
              : require("../../../assets/candy/19.png")
          }
          style={{ width: 50, height: 50 }}
        />
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
        <Image
          resizeMode="stretch"
          source={require("../../../assets/backGroundForInventory.png")}
          style={{
            position: "absolute",
            width: ConstantsResponsive.MAX_WIDTH,
            height: ConstantsResponsive.MAX_HEIGHT * 0.7,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
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
