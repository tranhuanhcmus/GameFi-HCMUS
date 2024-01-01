import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import GradientButton from "../components/Button/GradientButton";
import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import useCustomNavigation from "./../hooks/useCustomNavigation/index";
import { useAppDispatch } from "../redux/store";
import { selectUser, setAddress } from "../redux/userSlice";
import { useSelector } from "react-redux";
import PetCarousel from "../components/Pets/PetCarousel";
import NormalButton from "../components/Button/NormalButton";

type Props = {};

const HomeScreen = (props: Props) => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const userState = useSelector(selectUser);

  const { data, isError, isLoading } = useBalance({
    address: userState.address,
  });
  const { disconnect } = useDisconnect(); // Add useDisconnect hook
  const navigate = useCustomNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isConnected) {
      navigate.replace("Connect");
      dispatch(setAddress(undefined));
    } else {
      dispatch(setAddress(address));
    }
  }, [isConnected]);
  return (
    <SafeAreaView className="flex flex-1 bg-[#210035]">
      <View className="">
        {isConnected && <W3mAccountButton balance="show" />}
        {isConnected && (
          <NormalButton onPress={() => disconnect()}>
            <Text className="text-center text-base font-semibold  text-white">
              Disconnect Wallet
            </Text>
          </NormalButton>
        )}
      </View>
      <View className=" flex-1">
        <PetCarousel />
      </View>
      <View className=" flex  flex-row items-center justify-center gap-4">
        <NormalButton className={"bg-[#FFE243]"}>
          <Text className="text-center text-base font-semibold  text-black">
            Line-Up build
          </Text>
        </NormalButton>
        <NormalButton className={"bg-[#FFE243]"}>
          <Text className="text-center text-base font-semibold  text-black">
            Normal play
          </Text>
        </NormalButton>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
