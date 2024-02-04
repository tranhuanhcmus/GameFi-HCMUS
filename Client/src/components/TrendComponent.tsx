import { View, Text } from "react-native";
import React from "react";
import ArrowDrop from "../../assets/arrowdrop.svg";
import ArrowUp from "../../assets/arrowup.svg";

interface TrendProps {
  up: boolean;
  number: number;
}

const TrendComponent: React.FC<TrendProps> = ({ up, number }) => {
  return (
    <View className="flex flex-row items-center justify-center gap-1">
      {up ? <ArrowUp></ArrowUp> : <ArrowDrop />}
      <Text className={`${up ? "text-green-500" : "text-red-500"} font-bold`}>
        {number}%
      </Text>
    </View>
  );
};

export default TrendComponent;
