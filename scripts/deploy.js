// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log("Lock with 1 ETH deployed to:", lock.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers, network, run } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying Contact");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Deployed Contract at:  ${contract.address}`);
  // console.log(network);

  //what is we deploy it on local chain then what.
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("waiting to verify contract on EtherScan.....");
    await contract.deployTransaction.wait(6);
    await verify(contract.address, []);
  }

  //favNumber
  const retrieve = await contract.retrieve();
  console.log(`Value: ${retrieve}`);

  const transectionResponce = await contract.store(8);
  await transectionResponce.wait(1);
  const Updated = await contract.retrieve();
  console.log(`Updated Value: ${Updated}`);
}

async function verify(contractAddress, args) {
  console.log("verifying contract");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.tolawercase().include("already verified")) {
      console.log("already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
