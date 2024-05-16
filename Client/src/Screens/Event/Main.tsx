import { ScrollView, View, Image } from "react-native";
import CustomText from "../../components/CustomText";
import { COLOR } from "../../utils/color";
import ConstantsResponsive from "../../constants/Constanst";
import Medicine from "../../../assets/Medicine.svg";
import Lucky from "../../../assets/medicine.png";
const EventScreen = () => {
  return (
    <View
      style={{
        height: ConstantsResponsive.MAX_HEIGHT,
        width: ConstantsResponsive.MAX_WIDTH,
        backgroundColor: COLOR.PURPLE,
      }}
    >
      <View
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CustomText
          style={{ color: COLOR.GREEN, fontSize: 40, fontWeight: "bold" }}
        >
          LUCKY
        </CustomText>
        <CustomText style={{ color: COLOR.GREEN, fontSize: 35 }}>
          EVENTS
        </CustomText>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        <View
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.8,
            height: ConstantsResponsive.MAX_HEIGHT * 0.3,
            backgroundColor: COLOR.DARKER_PURPLE,
            borderRadius: 15,
            justifyContent: "space-between",
            alignSelf: "center",
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          <View>
            <View
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Medicine width={30} height={30} />
              <CustomText style={{ color: COLOR.WHITE, paddingStart: 5 }}>
                230
              </CustomText>
            </View>
            <CustomText
              style={{ color: COLOR.WHITE, paddingStart: 10, fontSize: 20 }}
            >
              MATIC MANIA RAFFLE
            </CustomText>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <CustomText style={{ color: COLOR.WHITE, fontSize: 10 }}>
              8 h 56 m
            </CustomText>
            <View
              style={{
                width: 140,
                height: 50,
                backgroundColor: COLOR.GREEN,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: 15,
              }}
            >
              <CustomText
                style={{
                  color: COLOR.WHITE,
                  paddingStart: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                ENTER
              </CustomText>
              <Image source={Lucky} style={{ width: 30, height: 30 }} />
              <CustomText
                style={{
                  color: COLOR.WHITE,
                  paddingStart: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                300
              </CustomText>
            </View>
          </View>
        </View>
        <View
          style={{
            width: ConstantsResponsive.MAX_WIDTH * 0.8,
            height: ConstantsResponsive.MAX_HEIGHT * 0.3,
            backgroundColor: COLOR.DARKER_PURPLE,
            borderRadius: 15,
            justifyContent: "space-between",
            alignSelf: "center",
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          <View>
            <View
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Medicine width={30} height={30} />
              <CustomText style={{ color: COLOR.WHITE, paddingStart: 5 }}>
                230
              </CustomText>
            </View>
            <CustomText
              style={{ color: COLOR.WHITE, paddingStart: 10, fontSize: 20 }}
            >
              DAILY GEMS BONANZA!
            </CustomText>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <CustomText style={{ color: COLOR.WHITE, fontSize: 10 }}>
              9 h 53 m
            </CustomText>
            <View
              style={{
                width: 140,
                height: 50,
                backgroundColor: COLOR.GREEN,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: 15,
              }}
            >
              <CustomText
                style={{
                  color: COLOR.WHITE,
                  paddingStart: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                ENTER
              </CustomText>
              <Image source={Lucky} style={{ width: 30, height: 30 }} />
              <CustomText
                style={{
                  color: COLOR.WHITE,
                  paddingStart: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                50
              </CustomText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventScreen;
