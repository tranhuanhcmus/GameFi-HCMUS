import React, { useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/alertSlice";

type Props = {};

const PlayScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Example: Dispatch an alert when the PlayScreen component mounts
    dispatch(showAlert("This is an alert from PlayScreen"));
  }, [dispatch]);

  const handleShowAlert = () => {
    // Example: Dispatch an alert when a button is pressed
    dispatch(showAlert("Test Alert!"));
  };

  return (
    <SafeAreaView className="h-full w-full bg-[#0C0113]">
      <View className="flex h-full w-full items-center justify-center bg-[#0C0113]">
        <Text className="text-white">PlayScreen</Text>
        <TouchableOpacity onPress={handleShowAlert}>
          <Text className="text-white">Show Alert</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;
