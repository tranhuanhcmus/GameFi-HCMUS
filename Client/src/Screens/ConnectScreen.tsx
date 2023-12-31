import React, { useEffect } from "react";
import { Button, Image, Text, View } from "react-native";
import { W3mAccountButton, useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useDisconnect } from "wagmi"; // Import useDisconnect hook
import NormalButton from "../components/Button/NormalButton";
import Moon from "../../assets/Moon.png";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "../components/Button/GradientButton";
import useCustomNavigation from "./../hooks/useCustomNavigation/index";

export default function ConnectScreen() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const navigate = useCustomNavigation();

  useEffect(() => {
    if (isConnected) {
      navigate.replace("Home");
    }
  }, [isConnected]);

  return (
    <>
      <View className="relative flex flex-1 bg-[#0C0113]">
        <Image className="absolute inset-0 z-0" source={Moon} />

        <View className="absolute z-10 flex h-full w-full flex-col p-4">
          <Text className="mt-4 w-full py-4 text-center text-lg font-bold text-white">
            GAME NAME
          </Text>

          <View className="mx-[5%] my-[15%] flex flex-1 flex-col items-center justify-between ">
            <Text className="w-full text-center text-[20px] font-bold text-white ">
              PLAY GAMES, CHALLENGE OTHERS & HAVE FUN
            </Text>

            <View className="w-full ">
              {!isConnected && (
                <GradientButton
                  colors={["#76E268", "#FFD505"]}
                  locations={[0, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  onPress={() => open()}
                >
                  {isConnecting ? (
                    <Text className="text-center text-base font-semibold  text-white">
                      Connecting...
                    </Text>
                  ) : (
                    <Text className="text-center text-base font-semibold  text-white">
                      Connect Wallet
                    </Text>
                  )}
                </GradientButton>
              )}
            </View>
          </View>

          <View className="p-4">
            <Text className="m-auto w-[60%] text-center text-sm text-white ">
              Terms and conditions policies & privacy
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
