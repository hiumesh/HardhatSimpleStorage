import { ethers, run, network } from "hardhat";

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract deployed at: ${simpleStorage.address}`);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is ${currentValue}`);

  const transactionResponse = await simpleStorage.store(69);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is ${updatedValue}`);
}

async function verify(contractAddress: string, args: any = []) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if ((e as Error).message.toLowerCase().includes("already verified"))
      console.log("Already Verified");
    else console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
