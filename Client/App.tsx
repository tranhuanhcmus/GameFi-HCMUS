import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import '@walletconnect/react-native-compat';
import { WagmiConfig, useAccount } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal, W3mButton, Web3Modal } from '@web3modal/wagmi-react-native'
import HomeScreen from './Screens/HomeScreen';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '039c22f40077998e7e7a801569526cd9'

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'metamask',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig
})


export default function App() {

  return (
    <WagmiConfig config={wagmiConfig}>
      <HomeScreen />
      <Web3Modal />
    </WagmiConfig>


  );
}

