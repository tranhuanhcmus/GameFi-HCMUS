import "@walletconnect/react-native-compat";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

import { WagmiProvider, useAccount } from "wagmi";
import { SafeAreaView, LogBox } from "react-native";
import Route from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { registerRootComponent } from "expo";
import connectConfig from "./src/config/WalletConnectConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { mainnet, testnet, projectId, metadata } = connectConfig;
const chains = [mainnet, testnet] as const;
// const chains = [mainnet, polygon, arbitrum] as const;
const queryClient = new QueryClient();
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

LogBox.ignoreAllLogs(true);

createWeb3Modal({
  projectId,
  wagmiConfig,
  defaultChain: mainnet, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Route />
          <Web3Modal />
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

registerRootComponent(App);
