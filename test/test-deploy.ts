import { ethers } from "hardhat";
import { assert } from "chai";

import { SimpleStorage } from "../typechain-types";

describe("SimpleStorage", function () {
  let SimpleStorageFactory;
  let simpleStorage: undefined | SimpleStorage;
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    await simpleStorage?.deployTransaction.wait(2);
    const currentValue = await simpleStorage?.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue?.toString(), expectedValue);
  });

  it("Should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage?.store(expectedValue);

    await transactionResponse?.wait(1);
    const currentValue = await simpleStorage?.retrieve();

    assert.equal(currentValue?.toString(), expectedValue);
  });
});
