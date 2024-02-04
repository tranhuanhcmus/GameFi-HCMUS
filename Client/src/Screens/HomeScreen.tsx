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

  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate.replace("Connect");
  //     dispatch(setAddress(undefined));
  //   } else {
  //     dispatch(setAddress(address));
  //   }
  // }, [isConnected]);
  return (
    <SafeAreaView>
      {/* <View className="flex h-full w-full bg-[#210035]">
        {isConnected && <W3mAccountButton balance="show" />}
        {isConnected && (
          <NormalButton onPress={() => disconnect()}>
            <Text className="text-center text-base font-semibold  text-white">
              Disconnect Wallet
            </Text>
          </NormalButton>
        )}
      </View> */}
      <View className="flex h-screen w-screen flex-col items-center bg-[#210035]">
        <View className="mt-7 h-[55%] w-[100%]">
          <PetCarousel />
        </View>
        <View className=" flex h-[9%] w-[90%]  flex-row  justify-between ">
          <NormalButton
            className={
              "flex w-[40%] items-center justify-center bg-[#FFE243] px-5"
            }
          >
            <Text className="text-center text-base font-semibold  text-black">
              Line-Up build
            </Text>
          </NormalButton>
          <NormalButton
            className={"w-[40%] items-center justify-center bg-[#FFE243] px-5 "}
          >
            <Text className=" text-center text-base font-semibold  text-black">
              Normal play
            </Text>
          </NormalButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
