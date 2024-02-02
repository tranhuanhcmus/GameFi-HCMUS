import { ethers, hardhatArguments } from "hardhat";
import * as Config from "./config";

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();
  console.log("deploy from address: ", deployer.address);

  // const Factory = await ethers.getContractFactory("Floppy");
  // const token = await Factory.deploy();
  // const tokenAddress = await token.getAddress();
  // console.log("Token address:", tokenAddress);
  // Config.setConfig(network + ".Floppy", tokenAddress);

  const Factory = await ethers.getContractFactory("Vault");
  const token = await Factory.deploy();
  const tokenAddress = await token.getAddress();
  console.log("Token address:", tokenAddress);
  Config.setConfig(network + ".Vault", tokenAddress);

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
