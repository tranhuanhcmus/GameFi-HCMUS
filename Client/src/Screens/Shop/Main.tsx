import React, { useEffect, useRef, useState } from "react";
import ConstantsResponsive from "../../constants/Constanst";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { ItemComponent } from "../../components/ItemComponent";
import { ELEMENT } from "../../constants/types";
import CustomText from "../../components/CustomText";
import AlertBuyComponent from "../../components/AlertBuyComponent";
import woodSign from "../../../assets/WoodSign3.png";
import { flare } from "viem/chains";
import { COLOR } from "../../utils/color";
import Lucky from "../../../assets/medicine.png";
import Medicine from "../../../assets/medicine.svg";
type Props = {};
const itemArray = [
  {
    id: "1",
    title: "Lucky",
    data: [
      {
        id: "1",
        itemImg: Lucky,
        itemColor: COLOR.GREEN,
        price: 100,
        imgPrice: 250,
        itemAmount: 50,
        itemType: "1",
      },
      {
        id: "2",
        itemImg: Lucky,
        itemColor: COLOR.GREEN,
        price: 300,
        imgPrice: 250,
        itemAmount: 250,
        itemType: "1",
      },
      {
        id: "3",
        itemImg: Lucky,
        itemColor: COLOR.GREEN,
        price: 950,
        imgPrice: 100,
        itemAmount: 1000,
        itemType: "1",
      },
    ],
  },
  {
    id: "2",
    title: "Energy",
    data: [
      {
        id: "1",
        itemImg: Medicine,
        itemColor: COLOR.PINK,
        price: 20,
        imgPrice: 250,
        itemAmount: 1,
        itemType: "2",
      },
      {
        id: "2",
        itemImg: Medicine,
        itemColor: COLOR.PINK,
        price: 50,
        imgPrice: 250,
        itemAmount: 5,
        itemType: "2",
      },
      {
        id: "3",
        itemImg: Medicine,
        itemColor: COLOR.PINK,
        price: 100,
        imgPrice: 250,
        itemAmount: 10,
        itemType: "2",
      },
    ],
  },
  {
    id: "3",
    title: "Pet Food",
    data: [
      {
        id: "1",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 100,
        imgPrice: 250,
        itemAmount: 0,
        itemType: "3",
      },
      {
        id: "2",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 200,
        imgPrice: 250,
        itemAmount: 0,
        itemType: "3",
      },
      {
        id: "3",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 300,
        imgPrice: 250,
        itemAmount: 0,
        itemType: "3",
      },
    ],
  },
  {
    id: "4",
    title: "Gem",
    data: [
      {
        id: "1",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 200,
        imgPrice: 250,
        itemAmount: 50,
        itemType: "4",
      },
      {
        id: "2",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 520,
        imgPrice: 250,
        itemAmount: 200,
        itemType: "4",
      },
      {
        id: "3",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 1450,
        imgPrice: 250,
        itemAmount: 1000,
        itemType: "4",
      },
    ],
  },
  {
    id: "5",
    title: "Energy",
    data: [
      {
        id: "1",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 100,
        imgPrice: 250,
        itemAmount: 1,
        itemType: "5",
      },
      {
        id: "2",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 300,
        imgPrice: 250,
        itemAmount: 5,
        itemType: "5",
      },
      {
        id: "1",
        itemImg: Lucky,
        itemColor: COLOR.DARKER_PURPLE,
        price: 1000,
        imgPrice: 250,
        itemAmount: 100,
        itemType: "5",
      },
    ],
  },
];
const ShopScreen = (props: Props) => {
  const [clickItem, setClickItem] = useState(false);
  const [item, setItem] = useState({ message: "", description: "" });
  const onClickItem = (item: any) => {
    setClickItem(true);
    setItem({ message: "Item", description: "" });
  };
  const onSetClose = () => {
    setClickItem(false);
  };

  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT,
        position: "absolute",
        backgroundColor: COLOR.PURPLE,
      }}
    >
      <Image
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require("../../../assets/backGroundShop.png")}
      />
      <AlertBuyComponent
        isVisible={clickItem}
        onClose={onSetClose}
        message={item.message}
        description={item.description}
      ></AlertBuyComponent>
      <View
        style={{
          display: "flex",
          height: ConstantsResponsive.MAX_HEIGHT * 0.75,
          width: ConstantsResponsive.MAX_WIDTH,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: ConstantsResponsive.MAX_WIDTH * 0.2,
        }}
      >
        <FlatList
          ref={flatListRef}
          data={itemArray}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-2 flex items-center justify-center  rounded-md  px-2">
              <View className="relative " style={styles.img}>
                <Image
                  resizeMode="stretch"
                  source={woodSign}
                  style={styles.img}
                />
                <View
                  style={[
                    styles.img,
                    {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                    },
                  ]}
                >
                  <CustomText
                    style={[
                      styles.positionText,
                      {
                        fontSize: 20,
                        color: COLOR.WHITE,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {item.title}
                  </CustomText>
                </View>
              </View>

              <FlatList
                columnWrapperStyle={{
                  gap: 10,
                  width: "100%",
                }}
                data={item.data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                  <View className="mt-3">
                    <ItemComponent
                      itemColor={item.itemColor}
                      itemAmount={item.itemAmount}
                      price={item.price}
                      imgPrice={item.imgPrice}
                      onPress={() => {
                        onClickItem(item);
                      }}
                      itemType={item.itemType}
                    />
                  </View>
                )}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ShopScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  itemTitle: {
    fontSize: 30,
    color: "#38c241",
    fontFamily: "rexlia",
    marginBottom: 10,
  },

  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT,
    position: "absolute",
  },

  positionText: {
    marginTop: ConstantsResponsive.YR * 100 * 0.3,
  },

  img: {
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 255,

    height: ConstantsResponsive.YR * 100,
  },

  topPanel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: ConstantsResponsive.YR * 250,
    flexDirection: "column",
  },
  statsContainer: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.YR * 120,
    flexDirection: "row",
  },
  stats: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseButton: {
    width: ConstantsResponsive.YR * 50,
    height: ConstantsResponsive.YR * 50,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  pauseButtonIcon: {
    width: ConstantsResponsive.YR * 25,
    height: ConstantsResponsive.YR * 25,
  },
  levelContainer: {
    width: ConstantsResponsive.YR * 80,
    height: ConstantsResponsive.YR * 80,
    backgroundColor: "#ff1a1a",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  levelTitle: {
    fontSize: 21,
    color: "white",
    fontFamily: "LilitaOne",
  },
  levelNumber: {
    fontSize: 17,
    color: "white",
    fontFamily: "LilitaOne",
  },
  scoreIcon: {
    position: "absolute",
    left: 0,
    width: ConstantsResponsive.YR * 40,
    height: ConstantsResponsive.YR * 40,
  },
  scoreBar: {
    height: ConstantsResponsive.YR * 25,
    position: "absolute",
    left: 20,
    right: 5,
    backgroundColor: "white",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: 17,
    color: "black",
    fontFamily: "LilitaOne",
  },
  timeIcon: {
    position: "absolute",
    left: 0,
    width: ConstantsResponsive.YR * 40,
    height: ConstantsResponsive.YR * 40,
  },
  timeBar: {
    height: ConstantsResponsive.YR * 25,
    position: "absolute",
    left: 20,
    right: 5,
    backgroundColor: "white",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  timeNumber: {
    fontSize: 17,
    color: "black",
    fontFamily: "LilitaOne",
  },
  healthBarContainer: {
    height: ConstantsResponsive.YR * 40,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 120,
    marginLeft: ConstantsResponsive.XR * 60,
  },
  healthIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: ConstantsResponsive.YR * 46,
    height: ConstantsResponsive.YR * 40,
  },
  healthBar: {
    height: ConstantsResponsive.YR * 20,
    width:
      ConstantsResponsive.MAX_WIDTH -
      ConstantsResponsive.XR * 200 -
      ConstantsResponsive.XR * 60,
    marginLeft: ConstantsResponsive.XR * 40,
    marginTop: ConstantsResponsive.YR * 10,
    backgroundColor: "white",
    borderRadius: ConstantsResponsive.YR * 10,
  },
  healthBarInner: {
    position: "absolute",
    backgroundColor: "#ff1a1a",
    left: ConstantsResponsive.XR * 3,

    top: ConstantsResponsive.YR * 3,
    bottom: ConstantsResponsive.YR * 3,
    borderRadius: ConstantsResponsive.YR * 8,
  },
  playArea: {
    width: ConstantsResponsive.MAX_WIDTH,
    marginTop: ConstantsResponsive.YR * 150,
    height:
      ConstantsResponsive.MAX_HEIGHT -
      ConstantsResponsive.YR * 150 -
      ConstantsResponsive.YR * 112,
    flexDirection: "column",
  },
  playRow: {
    height:
      (ConstantsResponsive.MAX_HEIGHT -
        ConstantsResponsive.YR * 250 -
        ConstantsResponsive.YR * 112) /
      4,
    width: ConstantsResponsive.MAX_WIDTH,
    flexDirection: "row",
  },
  playCell: {
    width: ConstantsResponsive.MAX_WIDTH / 3,
    height:
      (ConstantsResponsive.MAX_HEIGHT -
        ConstantsResponsive.YR * 250 -
        ConstantsResponsive.YR * 112) /
      4,
    alignItems: "center",
  },
});
