import { W3mAccountButton, useWeb3Modal } from "@web3modal/wagmi-react-native";
import React, { useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { useAccount } from "wagmi"; // Import useDisconnect hook
import Moon from "../../../assets/Moon.png";
import GradientButton from "../../components/Button/GradientButton";
import CustomText from "../../components/CustomText";
import ConstantsResponsive from "../../constants/Constanst";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";

export default function ConnectScreen() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const navigate = useCustomNavigation();

  useEffect(() => {
    if (isConnected) {
      navigate.replace("MainTab");
    }
  }, [isConnected]);

  return (
    <SafeAreaView
      style={{
        width: ConstantsResponsive.MAX_WIDTH,
        height: ConstantsResponsive.MAX_HEIGHT,
        backgroundColor: "#0C0113",
      }}
    >
      <Image className="absolute inset-0 z-0" source={Moon} />

      <View className="absolute z-10 flex h-full w-full flex-col p-4">
        <CustomText className="mt-4 w-full py-4 text-center  text-lg font-bold text-white">
          Crypto Creatures
        </CustomText>

        <View className="mx-[5%] my-[15%] flex flex-1 flex-col items-center justify-between ">
          <CustomText className="w-full text-center text-[20px] text-white ">
            PLAY GAMES, CHALLENGE OTHERS & HAVE FUN
          </CustomText>

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
                  <CustomText className="text-center  text-base font-semibold  text-white">
                    Connecting...
                  </CustomText>
                ) : (
                  <CustomText className="text-center  text-base font-semibold  text-white">
                    Connect Wallet
                  </CustomText>
                )}
              </GradientButton>
            )}
            {isConnected && <W3mAccountButton balance="show" />}
          </View>
        </View>

        <View className="p-4">
          <CustomText className="m-auto w-[60%] text-center  text-sm text-white ">
            Terms and conditions policies & privacy
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
}
