import "@walletconnect/react-native-compat";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import { WagmiConfig, useAccount } from "wagmi";
import { SafeAreaView, LogBox } from "react-native";
import Route from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { registerRootComponent } from "expo";
import connectConfig from "./src/config/WalletConnectConfig";

const { mainnet, testnet, projectId, metadata } = connectConfig;
const chains = [mainnet, testnet];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

LogBox.ignoreAllLogs(true);

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  defaultChain: testnet,
});

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <Route />
        <Web3Modal />
      </Provider>
    </WagmiConfig>
  );
}

registerRootComponent(App);
