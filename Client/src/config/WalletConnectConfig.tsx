import { arbitrum,sepolia  } from "viem/chains";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "039c22f40077998e7e7a801569526cd9";

// 2. Create config
const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
  },
};

// 3. Define your chains
const mainnet = arbitrum;
const testnet = sepolia;

const connectConfig = { projectId, metadata, mainnet,testnet };
export default connectConfig;
