import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ethers, parseEther } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import NormalButton from "./Button/NormalButton";
import {
  useAccount,
  useConnect,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { sepolia } from "viem/chains";
import { calculatePriceInUSDC } from "../function/CalculatePriceGem";
import { mainnet } from "viem/chains";
import { parse } from "path";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../redux/loadingSlice";
import { showAlert } from "../redux/alertSlice";
import { setReLoad } from "../redux/reloadSlice";
type Props = {
  amount: number;
  children: React.ReactNode;
  style?: ViewStyle;
};

const ReCharge: React.FC<Props> = ({ amount, children, style }) => {
  const [recipient, setRecipient] = useState(
    "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
  );
  const [ethAmount, setEthAmount] = useState<string>("0");
  const dispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { data: hash, error, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, [isConnected, connect, connectors]);
  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP%22",
        );

        const data = await response.json();

        const ethToUsdcRate = data.USD;

        const ethValue =
          parseFloat(await calculatePriceInUSDC(amount)) / ethToUsdcRate;

        setEthAmount(ethValue.toString());
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, [amount]);

  const handleSendTransaction = async () => {
    if (isConnected) {
      dispatch(startLoading());

      const roundedEthAmount = parseFloat(ethAmount).toFixed(18);
      sendTransaction({
        to: recipient as `0x${string}`,
        value: ethers.parseEther(roundedEthAmount),
      });
    } else {
      console.error("Wallet is not connected or ETH amount is not available");
    }
  };

  useEffect(() => {
    if (error) {
      console.log("Error:", error);
      dispatch(
        showAlert({
          title: "Notification",
          message: { message: error.message, error: true },
        }),
      );
      dispatch(stopLoading());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isConfirming) {
      console.log("Transaction is confirming");
    }
    if (isConfirmed) {
      console.log("Transaction confirmed");
      dispatch(
        showAlert({
          title: "Notification",
          message: { message: "Transaction is success", error: false },
        }),
      );

      dispatch(stopLoading());
      dispatch(setReLoad());
    }
  }, [isConfirming, isConfirmed, dispatch]);

  return (
    <TouchableOpacity style={style} onPress={handleSendTransaction}>
      {children}
    </TouchableOpacity>
  );
};

export default ReCharge;
function connectAsync(arg0: { chainId: any; connector: any }) {
  throw new Error("Function not implemented.");
}
