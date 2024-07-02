import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, TouchableOpacity, View } from "react-native";
import { useAccount } from "wagmi";
import { API } from "../../apis/constants";
import CloseButton from "../../../assets/carbon_close-filled.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import { ItemGameOwnerService } from "../../services/ItemGameOwnerService";
import { COLOR } from "../../utils/color";
import useFetch from "../../hooks/useFetch";
const InventoryModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) => {
  /** useState */
  const [data, setData] = useState<any[]>([]);

  /** useAccount */
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { apiData, serverError } = useFetch(() =>
    ItemGameOwnerService.getItems("0xFe25C8BB510D24ab8B3237294D1A8fCC93241454"),
  );

  // const fetchData = async () => {
  //   try {
  //     const res: any[] = await ItemGameOwnerService.getItems(
  //       "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
  //     );
  //     console.log(res);
  //     setData([...res]);
  //   } catch (error) {
  //     console.error("ItemGameOwnerService.getItems", error);
  //   }
  // };

  useEffect(() => {
    // fetchData();
    // console.log("41", apiData);
    // setData([apiData]);
  }, []);

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
          width: ConstantsResponsive.MAX_WIDTH * 0.4,
          height: ConstantsResponsive.MAX_WIDTH * 0.4,
          backgroundColor: COLOR.BROWN_BORDER,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.4 + 10,
            height: ConstantsResponsive.MAX_WIDTH * 0.4 + 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../../../assets/border.png")}
        />
        <Image
          source={{ uri: `${API.server + image}` }}
          style={{ width: "80%", height: "80%" }}
          resizeMode="contain"
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
          paddingHorizontal: ConstantsResponsive.XR * 10,

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
          data={apiData}
          numColumns={2}
          columnWrapperStyle={{
            gap: 30,
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
