import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import TrendComponent from "./TrendComponent";

import Pet from "../../assets/avatar.png";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { COLOR } from "../utils/color";

interface Props {
  className: string;
  up: boolean;
  number: number;
  imgUrl: string;
  name: string;
  price: number;
}

const CartFilter: React.FC<Props> = ({
  className,
  name,
  up,
  price,
  number,
  imgUrl,
}) => {
  const data = {
    labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()), // Labels for days 1 to 30
    datasets: [
      {
        data: Array.from(
          { length: 30 },
          () => Math.floor(Math.random() * (150 - 50 + 1)) + 50,
        ), // Simulating random fluctuations

        strokeWidth: 4, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#F45151",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#F45151",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(244, 81, 81, ${opacity})`,
    barPercentage: 1,
  };
  return (
    <TouchableOpacity>
      <View className="mt-2 flex flex-row items-center">
        <View className=" flex h-fit flex-row items-center gap-2">
          <Image className="h-[40px] w-[40px]  " source={Pet} />

          <Text className="font-bold text-white">{name}</Text>
        </View>
        <View className="ml-2 flex h-fit w-fit items-start justify-start ">
          <LineChart
            data={data}
            width={250}
            height={50}
            withShadow={false}
            withInnerLines={false}
            style={{
              marginLeft: -60,
            }}
            withOuterLines={false}
            chartConfig={chartConfig}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withDots={false}
            bezier
          />
        </View>
        <View className="mt-3 flex flex-col justify-center">
          <Text className="text-white">${price}</Text>
          <TrendComponent up={up} number={number}></TrendComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartFilter;
