import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import TrendComponent from "../components/TrendComponent";
import TrendCard from "../components/TrendCard";
import ButtonFilter from "../components/Button/ButtonFilter";
import CartFilter from "../components/CartFilter";
import { flare } from "viem/chains";

type Props = {};
const trend = true;
const TrendMarketScreen = (props: Props) => {
  return (
    <SafeAreaView className="bg-color_app h-screen w-screen">
      <View className="ml-3 mt-3 flex flex-col">
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
          <View className="mt-2 flex flex-row">
            <TrendCard
              imgUrl=""
              name="FireBird"
              price={20}
              up={true}
              number={1112}
            ></TrendCard>
          </View>
        </View>
        <View className="mt-6 flex flex-col ">
          <Text className="text-[25px] font-bold text-white">
            Market Statistics
          </Text>
          <ScrollView
            horizontal
            className="mb-3 mt-2 flex flex-row gap-x-3 overflow-auto"
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
            name="FireBird"
            price={20}
            up={false}
            number={10}
            className="w-[80%]"
          ></CartFilter>
          <CartFilter
            imgUrl=""
            name="FireBird"
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