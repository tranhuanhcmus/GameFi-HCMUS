import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  Switch,
  Text,
} from "react-native";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import GradientButton from "../../components/Button/GradientButton";
import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import useCustomNavigation from "../../hooks/useCustomNavigation/index";
import { useAppDispatch } from "../../redux/store";
import { selectUser, setAddress } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import PetCarousel from "../../components/Pets/PetCarousel";

import NormalButton from "../../components/Button/NormalButton";
import SpriteSheet from "rn-sprite-sheet";
type Props = {};
const HomeScreen = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const userState = useSelector(selectUser);

  const { data, isError, isLoading } = useBalance({
    address: userState.address,
  });
  const { disconnect } = useDisconnect(); // Add useDisconnect hook
  const navigate = useCustomNavigation();
  const dispatch = useAppDispatch();

  const [loop, setLoop] = useState<boolean>(false);
  const [resetAfterFinish, setResetAfterFinish] = useState<boolean>(false);
  const [fps, setFps] = useState<string>("5");
  const mummyRef = useRef<SpriteSheet>(null);
  const [offsetX, setOffsetX] = useState<number>(-200);
  const [offsetY, setOffsetY] = useState<number>(0);

  const play = (type: string) => {
    const parsedFps = Number(fps);

    if (mummyRef.current) {
      mummyRef.current.play({
        type,
        fps: isNaN(parsedFps) ? 16 : parsedFps,
        loop,
        resetAfterFinish,
        onFinish: () => console.log("hi"),
      });
    }
    setOffsetX(-200);
    setLoop(true);
    setResetAfterFinish(true);
  };

  const stop = () => {
    if (mummyRef.current) {
      mummyRef.current.stop(() => console.log("stopped"));
    }
  };
  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate.replace("Connect");
  //     dispatch(setAddress(undefined));
  //   } else {
  //     dispatch(setAddress(address));
  //   }
  // }, [isConnected]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffsetX((prevOffsetX) => prevOffsetX + 20); // Update offsetX every interval
    }, 100); // Change the interval as needed for desired animation speed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

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
      <View className="flex h-screen w-full flex-col items-center bg-[#210035]">
        <View className="mt-7 h-[55%] w-[100%]">
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                transform: [{ translateX: offsetX }, { translateY: offsetY }],
              }}
            >
              <SpriteSheet
                ref={mummyRef}
                source={require("../../../assets/sprite1.png")}
                columns={3}
                rows={2}
                width={100}
                animations={{
                  walk: [0, 1, 3, 4, 2],
                }}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 30, paddingHorizontal: 30 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button onPress={() => play("walk")} title="walk" />
              <Button onPress={stop} title="stop" />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>FPS</Text>
              <TextInput
                style={{ flex: 1, borderBottomWidth: 1, fontSize: 16 }}
                value={fps}
                keyboardType="number-pad"
                onChangeText={setFps}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>Loop</Text>
              <Switch value={loop} onValueChange={setLoop} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>
                Reset After Finish
              </Text>
              <Switch
                value={resetAfterFinish}
                onValueChange={setResetAfterFinish}
              />
            </View>
          </View>
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
            onPress={() => {
              navigate.replace("Game");
            }}
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
