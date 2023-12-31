import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";
import GradientButton from "../components/Button/GradientButton";
import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import useCustomNavigation from "./../hooks/useCustomNavigation/index";

type Props = {};

const HomeScreen = (props: Props) => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { disconnect } = useDisconnect(); // Add useDisconnect hook
  const navigate = useCustomNavigation();

  useEffect(() => {
    if (!isConnected) {
      navigate.replace("Connect");
    }
  }, [isConnected]);
  return (
    <View className="flex flex-1 items-center justify-center">
      <View className="">
        {isConnected && <W3mAccountButton balance="show" />}
        {isConnected && (
          <GradientButton
            colors={["#76E268", "#FFD505"]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            onPress={() => disconnect()}
          >
            <Text className="text-center text-base font-semibold  text-white">
              Disconnect Wallet
            </Text>
          </GradientButton>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
