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
import { useIsFocused } from "@react-navigation/native";
import Medicine from "../../../assets/medicine.svg";
import { ItemAppService } from "../../services/ItemAppService";
type Props = {};

interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  quality: string;
  quantity: number;
  gemcost: number;
  goldcost: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Items {
  [key: string]: Item[]; // This defines an object where keys are strings and values are arrays of Item
}

const ShopScreen = (props: Props) => {
  const [clickItem, setClickItem] = useState(false);
  const [item, setItem] = useState<Item>();
  const [items, setItems] = useState<Items[]>([]);
  const isFocused = useIsFocused();
  const fetchItems = async () => {
    try {
      const fetchedItems = await ItemAppService.getAllItems();
      // console.log(fetchedItems);
      setItems(fetchedItems);
    } catch (error) {
      console.log("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [isFocused]);

  const onClickItem = (item: any) => {
    setClickItem(true);
    setItem(item);
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
        gemcost={item?.gemcost}
        name={item?.name}
        goldcost={item?.goldcost}
        message={item?.quality}
        description={item?.description}
      />
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
          data={Object.values(items)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
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
                    {Object.keys(items)[index].toUpperCase()}
                  </CustomText>
                </View>
              </View>

              <FlatList
                columnWrapperStyle={{
                  gap: 10,
                  width: "100%",
                }}
                data={item}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                  <View className="mt-3">
                    <ItemComponent
                      itemAmount={item.quantity}
                      gemcost={item.gemcost}
                      itemName={item.name}
                      goldcost={item.goldcost}
                      itemImg={item.image}
                      onPress={() => {
                        onClickItem(item);
                      }}
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
