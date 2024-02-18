import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { startLoading, stopLoading } from "../../redux/loadingSlice";
import { useDispatch } from "react-redux";

type Props = {};

export default function TestScreen({}: Props) {
  const dispatch = useDispatch();
  const handleSomeAsyncAction = () => {
    dispatch(startLoading());

    // Simulate an asynchronous operation (replace this with your actual async logic)
    setTimeout(() => {
      dispatch(stopLoading());
    }, 5000);
  };

  return (
    <SafeAreaView className="flex h-full w-full  bg-[#0C0113]">
      <View className="flex h-full w-full items-center justify-center bg-[#0C0113]">
        <Text className="text-white">TestScreen</Text>
        <TouchableOpacity onPress={handleSomeAsyncAction}>
          <Text className="text-white">Show loading</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
