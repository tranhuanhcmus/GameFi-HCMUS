import { View, Text, Image } from "react-native";
import React from "react";
import SVGSetting from "../../assets/SVGSetting.svg";
import SVGProfile from "../../assets/SVGProfile.svg";
import Ellipse from "../../assets/Ellipse.svg";
import Polygon from "../../assets/Polygon.svg";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <View className="relative flex h-full w-screen flex-row items-center justify-center  ">
      <View className="flex h-[80%] w-[40%] flex-row items-center justify-between rounded-[20px] bg-gray-200 px-4 py-2">
        <View className="flex flex-row items-center gap-2">
          <Ellipse></Ellipse>
          <Text className="text-[18px]  font-bold">10</Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Polygon></Polygon>
          <Text className="text-[18px]  font-bold">100</Text>
        </View>
      </View>
      <View className="absolute left-2  ">
        <SVGSetting height={30} width={30} />
      </View>
      <View className="absolute right-8 ">
        <SVGProfile height={30} width={30} />
      </View>
    </View>
  );
};

export default Header;
