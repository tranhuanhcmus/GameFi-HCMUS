import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import ConstantsResponsive from "../constants/Constanst";
import { COLOR } from "../utils/color";
import CustomText from "./CustomText";
import Thunder from "../../assets/thunder.svg";
import Coin from "../../assets/coin.svg";
import useCustomNavigation from "../hooks/useCustomNavigation";
import { ItemAppOwnerService } from "../services/ItemAppOwnerService";
import { useAccount } from "wagmi";
import log from "../logger/index.js";
interface HeaderProps {
  name: string;
}
const GOLD = "Gold";
const GEM = "Gem";

const Header: React.FC<HeaderProps> = ({ name }) => {
  const [data, setData] = useState<any[]>([]);

  /** useAccount */
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const fetchData = async () => {
    try {
      const res: any[] = await ItemAppOwnerService.getCurrency(address);
      setData([...data, ...res]);
    } catch (error) {
      log.error("ItemAppOwnerService.getCurrency", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address]);
  const navigate = useCustomNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("Shop");
      }}
      style={{
        width: ConstantsResponsive.MAX_WIDTH * 0.4,
        height: ConstantsResponsive.YR * 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",

        borderRadius: 20,
        paddingVertical: ConstantsResponsive.XR * 4,
      }}
    >
      <Image
        resizeMode="stretch"
        style={{
          height: ConstantsResponsive.YR * 40,
          width:
            ConstantsResponsive.MAX_WIDTH * 0.4 + ConstantsResponsive.XR * 4,
          left: 0,

          position: "absolute",
        }}
        source={require("../../assets/backGroundButtonBrown.png")}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Coin></Coin>
        <CustomText
          style={{
            color: COLOR.YELLOW,
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {data && data.length
            ? data.find((item) => item.name == GOLD).quantity
            : 0}
        </CustomText>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Thunder
          height={ConstantsResponsive.YR * 25}
          width={ConstantsResponsive.XR * 25}
        />
        <CustomText
          style={{
            color: COLOR.CYAN,
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {data && data.length
            ? data.find((item) => item.name == GEM).quantity
            : 0}
        </CustomText>
      </View>
    </TouchableOpacity>

    // <View className="relative flex h-fit w-[100%] flex-row items-center justify-center   ">
    //   <W3mAccountButton balance="show" style={{ backgroundColor: "white" }} />
    // </View>
  );
};

export default Header;
