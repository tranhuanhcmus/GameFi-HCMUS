import { ethers, hardhatArguments } from "hardhat";
import * as Config from "./config";
import 'dotenv/config';

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

  // const Factory = await ethers.getContractFactory("Vault");
  // const token = await Factory.deploy();
  // const tokenAddress = await token.getAddress();
  // console.log("Token address:", tokenAddress);
  // Config.setConfig(network + ".Vault", tokenAddress);
  
  let owner=process.env.MY_ADDRESS
  if(network=='localhost')
     owner=`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
  const Factory = await ethers.getContractFactory("Pet");
  const token = await Factory.deploy(owner);
  const tokenAddress = await token.getAddress();
  console.log("Token address:", tokenAddress);
  Config.setConfig(network + ".Pet", tokenAddress);


  
  // const Factory = await ethers.getContractFactory("MarketPlace");
  // const token = await Factory.deploy('0xd11875cE6854da3518273cF16Ab2FC399224Bed9','0x7C35F8b75C98B89C4f9955E1f950a129BC07dcc8');
  // const tokenAddress = await token.getAddress();
  // console.log("Token address:", tokenAddress);
  // Config.setConfig(network + ".MarketPlace", tokenAddress);

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
