import { View, Text, Image } from "react-native";
import React from "react";

import Pet from "../../assets/Pet.png";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { flare } from "viem/chains";
import { position } from "native-base/lib/typescript/theme/styled-system";
import TrendComponent from "./TrendComponent";

interface Props {
  imgUrl: string;
  name: string;
  price: number;
  up: boolean;
  number: number;
}

const TrendCard: React.FC<Props> = ({ imgUrl, name, price, up, number }) => {
  // Import the random function from lodash or any other library

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
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(75, 112, 255, ${opacity})`,
    barPercentage: 1,
  };

  return (
    <View className="z-0 flex flex-col rounded-2xl bg-color_card_trend p-3">
      <View className=" flex h-fit flex-row items-center gap-2">
        <Image className="h-[40px] w-[40px]  " source={Pet} />

        <Text className="font-bold text-[#4B70FF]">{name}</Text>
      </View>
      <View className="flex h-fit w-fit items-start justify-start ">
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
      <View className="mt-3 flex flex-row justify-between">
        <Text className="text-white">${price}</Text>
        <TrendComponent up={up} number={number}></TrendComponent>
      </View>
    </View>
  );
};

export default TrendCard;
