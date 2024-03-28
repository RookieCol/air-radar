import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
const rpcTestnetEndpoint = process.env.RPC_TESTNET_ENDPOINT; 

if (!deployerPrivateKey) {
  throw new Error('No private key setup');
}

if (!rpcTestnetEndpoint) {
  throw new Error('RPC_TESTNET_ENDPOINT is not defined');
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "Hedera_testnet", 
  namedAccounts: {
    deployer: {
      default: 0, 
    },
  },
  networks: {
    Hedera_testnet: {
      url: rpcTestnetEndpoint, 
      accounts: [deployerPrivateKey],
    },
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
