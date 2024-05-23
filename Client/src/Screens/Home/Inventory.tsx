import React, { useEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import DiamondGameBg from "../../../assets/DiamondGameBg.jpg";
import CloseButton from "../../../assets/carbon_close-filled.svg";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { COLOR } from "../../utils/color";
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

  return isVisible ? (
    <View
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT * 0.7,
        backgroundColor: COLOR.CYAN,
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 99,
        top: ConstantsResponsive.MAX_HEIGHT * 0.1,
      }}
    >
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "10%",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
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

      <ScrollView
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "80%",
          flexGrow: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 5,
          }}
        >
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
            <Image source={Medicine} style={{ width: 50, height: 50 }} />
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
                x10
              </CustomText>
            </View>
          </View>
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
            <Image source={Medicine} style={{ width: 50, height: 50 }} />
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
                x10
              </CustomText>
            </View>
          </View>
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
            <Image source={Medicine} style={{ width: 50, height: 50 }} />
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
                x10
              </CustomText>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
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
            <Image source={Medicine} style={{ width: 50, height: 50 }} />
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
                x10
              </CustomText>
            </View>
          </View>
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
            <Image source={Medicine} style={{ width: 50, height: 50 }} />
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
                x10
              </CustomText>
            </View>
          </View>
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
            <Image source={Medicine} style={{ width: 50, height: 50 }} />
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
                x10
              </CustomText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  ) : null;
};

export default InventoryModal;
