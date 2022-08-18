import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.9",
// };

// export default config;

// require("@nomiclabs/hardhat-waffle");
// require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY_URL = "https://eth-mainnet.g.alchemy.com/v2/qPJ12Qd0OMFiwgu99oBZk3lBZAfx_bJW";

const MUMBAI_PRIVATE_KEY = "e79e6dcfe400bd2ec7c4160f73969c8ca9d957bf364e7c4c2014a36cfdbac0c7";

module.exports = {
  solidity: "0.8.9",
  networks: {
    mainnet: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
