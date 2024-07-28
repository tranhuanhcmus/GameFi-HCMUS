import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import colors from "../../../common/colors";
import Defeat from "../../../assets/defeat.svg";
import Victory from "../../../assets/victory.svg";
import ConstantsResponsive from "../../constants/Constanst";
import profile from "../../../assets/avatar.png";
import Cup from "../../../assets/navIcon/trophy.svg";
import { ItemAppOwnerService } from "../../services/ItemAppOwnerService";
import AlertBuyItemsSuccess from "../../components/AlertBuyItemsSuccess";
import { CATEGORY } from "../../constants/types";
import NormalButton from "../../components/Button/NormalButton";

interface props {
  status: string;
  onPress: () => void;
}

const StatusPopup: React.FC<props> = ({ status, onPress }) => {
  const message = status === "Victory" ? "Victory" : "Defeat";
  const buttonText = status === "Victory" ? "Claim" : "ok";
  const resultColor = status === "Victory" ? "victoryColor" : "defeatColor";
  const [reward, setReward] = useState<any>();
  const [getItems, setGetItems] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      const res = await ItemAppOwnerService.getReward(
        "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
      );

      console.log("API Response:", res); // Log the response to see its structure

      if (res && typeof res === "object") {
        const mappedData = {
          cup: res.cupData.cup,
          gold: res.currencyData.quantity,
          itemData: {
            data: [
              {
                quantity: res.itemData.quantity,
                name: res.itemData.name,
                image: res.itemData.image,
              },
              {
                quantity: res.currencyData.quantity,
                name: "gold",
                image: "/uploads/gold.jpg",
              },
            ],
            pack: require("../../../assets/silver_treasure.png"),
          },
        };
        setReward(mappedData);
      } else {
        console.error("Unexpected response format:", res);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    if (status === "Victory") {
      fetchData();
    }
  }, [status]);

  return (
    <Modal
      visible={status !== "" && status !== "win"}
      animationType="fade"
      transparent={true}
    >
      {getItems && (
        <AlertBuyItemsSuccess
          name={"food"}
          category={CATEGORY.REWARD}
          quantity={0}
          itemImg={reward?.itemData}
          isVisible={getItems}
          onClose={() => {
            onPress();
            setGetItems(false);
          }}
        />
      )}
      <View style={styles.modalContainer}>
        <Image
          source={require("../../../assets/backGroundForInventory.png")}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        />
        <Animatable.View
          animation={"zoomIn"}
          delay={400}
          style={[styles.popup]}
        >
          <SafeAreaView style={styles.containerContent}>
            {status === "Victory" ? (
              <Victory width={styles.svgIcon.width}></Victory>
            ) : (
              <Defeat width={styles.svgIcon.width}></Defeat>
            )}
            <View style={styles.containerProfile}>
              <Image source={profile} style={styles.imgProfile} />
              <View className="mt-5 flex flex-row items-center justify-center gap-2">
                <Text style={styles.text}>
                  {status === "Victory" ? `+${reward?.cup}` : 0}
                </Text>
                <Image source={Cup} />
              </View>
            </View>
            {status === "Victory" && (
              <TouchableOpacity
                onPress={() => setGetItems(true)}
                style={{ height: "40%", width: "50%" }}
              >
                <Image
                  source={require("../../../assets/silver_treasure.png")}
                  resizeMode="contain"
                  style={{
                    height: "100%",
                    position: "absolute",
                    width: "100%",
                  }}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={onPress} style={styles.btn}>
              <Text style={styles.btnText}>{buttonText}</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerContent: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: ConstantsResponsive.MAX_HEIGHT,
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 50,
  },
  svgIcon: {
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 100,
  },

  containerProfile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imgProfile: {
    borderRadius: 1000,
    height: ConstantsResponsive.XR * 100,
    width: ConstantsResponsive.XR * 100,
  },

  popup: {
    width: "100%",
    height: "100%",
    padding: 20,

    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFA402",
  },
  btn: {
    position: "absolute",
    width: ConstantsResponsive.MAX_WIDTH * 0.7,
    bottom: ConstantsResponsive.YR * 100,
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: "#FFA402",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,

    backgroundColor: colors.shapeColor,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default StatusPopup;
