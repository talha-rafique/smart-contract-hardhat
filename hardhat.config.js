require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/account");
require("hardhat-gas-reporter");

let rinkby_alchemy_url = process.env.ALCHEMY_RINKBY_URL || "https://rinkby-url";
let PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
let ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
let COINMARKETCAP = process.env.COINMARKETCAP_API_KEY || "key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",

  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    rinkeby: {
      url: rinkby_alchemy_url,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      //accounts: thanks hardhat!
      chainId: 31337,
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP,
    token: "ETH",
    outputFile: "gassReport.txt",
    noColors: true,
  },
};
