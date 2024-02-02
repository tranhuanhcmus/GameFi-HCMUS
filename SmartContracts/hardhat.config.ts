import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import "@nomicfoundation/hardhat-verify";

const config = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    arbitrumSepolia: {
      url: 'https://eth-sepolia.api.onfinality.io/public',
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrumOne: {
      url: 'https://arb1.arbitrum.io/rpc',
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "TMKJCXJDWKAA6EVBG244YKU3UKD34MTNY2"
  },
};

export default config;
