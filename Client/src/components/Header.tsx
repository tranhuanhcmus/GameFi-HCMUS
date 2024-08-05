import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { W3mAccountButton } from "@web3modal/wagmi-react-native";
import ConstantsResponsive from "../constants/Constanst";
import { COLOR } from "../utils/color";
import CustomText from "./CustomText";
import Thunder from "../../assets/navIcon/thunder.svg";
import Coin from "../../assets/navIcon/coin.svg";
import Gem from "../../assets/diamond.svg";
import useCustomNavigation from "../hooks/useCustomNavigation";
import { ItemAppOwnerService } from "../services/ItemAppOwnerService";
import { useAccount } from "wagmi";
import log from "../logger/index.js";
import logger from "../logger/index.js";
import useFetch from "../hooks/useFetch";
import { UsersService } from "../services/UsersService";
import { useDispatch, useSelector } from "react-redux";
import { updateEnergy } from "../redux/playerSlice";
import { useIsFocused } from "@react-navigation/native";

interface HeaderProps {
  name: string;
}
const GOLD = "Gold";
const GEM = "Gem";

const Header: React.FC<HeaderProps> = ({ name }) => {
  const [data, setData] = useState<any[]>([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  /** useAccount */
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { reLoad } = useSelector((state: any) => state.reLoad);

  const fetchData = async () => {
    try {
      const res: any[] = await ItemAppOwnerService.getCurrency(address);
      console.log(res);
      setData([...res]);
    } catch (error) {
      log.error("ItemAppOwnerService.getCurrency", error);
    }
  };

  const { apiData: energyUser, serverError } = useFetch(
    () => UsersService.getOwnerEnergy(address as `0x${string}`),
    [reLoad],
  );

  useEffect(() => {
    fetchData();
  }, [address, reLoad, isFocused]);

  useEffect(() => {
    if (energyUser) {
      dispatch(updateEnergy(energyUser.energy));
    }
  }, [energyUser, reLoad]);

  const navigate = useCustomNavigation();
  return (
    <View
      style={{
        maxWidth: ConstantsResponsive.MAX_WIDTH * 0.6,
        height: ConstantsResponsive.YR * 50,
        display: "flex",
        flexDirection: "row",

        alignItems: "center",
        marginHorizontal: ConstantsResponsive.XR * 40,
        justifyContent: "center",
        columnGap: ConstantsResponsive.XR * 30,

        position: "relative",

        borderRadius: 20,
      }}
    >
      <Image
        resizeMode="stretch"
        style={{
          height: ConstantsResponsive.YR * 50,
          maxWidth: ConstantsResponsive.MAX_WIDTH * 0.5,

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
        <Coin height={20} width={20}></Coin>
        <CustomText
          style={{
            color: COLOR.YELLOW,
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {data && data.length
            ? Math.floor(data.find((item) => item.name == GOLD).quantity)
            : 100}
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
        <Gem height={20} width={20} />
        <CustomText
          style={{
            color: COLOR.YELLOW,
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {data && data.length
            ? Math.floor(data.find((item) => item.name == GEM).quantity)
            : 100}
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
          {energyUser?.energy}
        </CustomText>
      </View>
    </View>

    // <View className="relative flex h-fit w-[100%] flex-row items-center justify-center   ">
    //   <W3mAccountButton balance="show" style={{ backgroundColor: "white" }} />
    // </View>
  );
};

export default Header;
