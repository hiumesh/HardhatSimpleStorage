import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

import "./task/block-number";

dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [
        "0xa41c0ad8c8ddf69d809ef69b8d58e3ec197318dad1a75f91e988be55ec41291a",
      ],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};

export default config;
