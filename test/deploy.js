const { expect } = require("chai");
const { ethers } = require("hardhat");

//describe
//before each
//it

describe("test", () => {
  let contractFactory, contract;

  beforeEach(async () => {
    contractFactory = await ethers.getContractFactory("SimpleStorage");
    contract = await contractFactory.deploy();
  });

  //it
  it(`should Start with Fav Number of "0"`, async () => {
    const favNumber = await contract.retrieve();
    const expectedValue = 0;

    //assert
    //expect

    expect(expectedValue).to.equal(favNumber);
  });

  it(`Should update the value to 15 `, async () => {
    const expatiatedValue = 15;
    const transection = await contract.store(expatiatedValue);
    // await transection.wait(1);

    let favnumber = await contract.retrieve();

    expect(expatiatedValue).to.equal(favnumber);
  });
});
