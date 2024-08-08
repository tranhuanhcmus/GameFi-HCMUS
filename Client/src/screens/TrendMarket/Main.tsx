import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import TrendComponent from "../../components/TrendComponent";
import TrendCard from "../../components/TrendCard";
import ButtonFilter from "../../components/Button/ButtonFilter";
import CartFilter from "../../components/CartFilter";
import ConstantsResponsive from "../../constants/Constanst";
import { flare } from "viem/chains";
import { StatusBarHeight } from "../../function/CalculateStatusBar";

type Props = {};
const trend = true;
const TrendMarketScreen = (props: Props) => {
  return (
    <SafeAreaView className="flex-1 ">
      <Image
        style={{
          width: ConstantsResponsive.MAX_WIDTH,
          height: ConstantsResponsive.MAX_HEIGHT,
          position: "absolute",
        }}
        resizeMode="stretch"
        source={require("../../../assets/backGroundForInventory.png")}
      />
      <View style={styles.playArea} className="flex flex-col p-2 ">
        <View className="gap-1">
          <Text className="font-light text-white">TrendMarketScreen</Text>
          <View className="flex w-[80%] flex-row justify-between">
            <Text className="text-[30px] font-bold text-white">$125550.50</Text>
            <View
              className={`${trend ? "bg-color_up_trend" : "bg-color_down_trend"} flex w-fit items-center justify-center rounded-2xl px-4`}
            >
              <TrendComponent number={11.75} up={trend}></TrendComponent>
            </View>
          </View>
        </View>
        <View className="mt-4 ">
          <Text className="font-ligh text-white"> My Portfolio</Text>
          <View className=" flex flex-row">
            <TrendCard
              imgUrl=""
              name="Fire Bear"
              price={20}
              up={true}
              number={1112}
            ></TrendCard>
          </View>
        </View>
        <View
          className="mt-6 flex flex-col "
          style={{ width: ConstantsResponsive.MAX_WIDTH }}
        >
          <Text className="text-[25px] font-bold text-white">
            Market Statistics
          </Text>
          <ScrollView
            horizontal
            className="mb-3  flex flex-row gap-x-3 overflow-auto"
          >
            <ButtonFilter
              className="rounded-xl bg-color_button_filter py-2 "
              textColor="text-white"
            >
              24 hrs
            </ButtonFilter>
            <ButtonFilter
              className="rounded-xl bg-color_button_filter py-2 "
              textColor="text-white"
            >
              Hot
            </ButtonFilter>
            <ButtonFilter
              className="rounded-xl bg-color_button_filter py-2 "
              textColor="text-white"
            >
              Profit
            </ButtonFilter>

            <ButtonFilter
              className="rounded-xl bg-color_button_filter py-2 "
              textColor="text-white"
            >
              Rising
            </ButtonFilter>
            <ButtonFilter
              className="rounded-xl bg-color_button_filter py-2 "
              textColor="text-white"
            >
              Loss
            </ButtonFilter>
            <ButtonFilter
              className="rounded-xl bg-color_button_filter py-2 "
              textColor="text-white"
            >
              Top Gain
            </ButtonFilter>
          </ScrollView>
          <CartFilter
            imgUrl=""
            name="Bear 2"
            price={20}
            up={false}
            number={10}
            className="w-[80%]"
          ></CartFilter>
          <CartFilter
            imgUrl=""
            name="Bear 3"
            price={20}
            up={true}
            number={11.2}
            className="w-[80%]"
          ></CartFilter>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrendMarketScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  backgroundImage: {
    width: ConstantsResponsive.MAX_WIDTH,
    height: ConstantsResponsive.MAX_HEIGHT - ConstantsResponsive.YR - 60,
    position: "absolute",
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
      ConstantsResponsive.XR * 100 -
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
    marginTop: ConstantsResponsive.YR * 50 + StatusBarHeight,
    height:
      ConstantsResponsive.MAX_HEIGHT -
      ConstantsResponsive.YR * 250 -
      ConstantsResponsive.YR * 112 -
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
