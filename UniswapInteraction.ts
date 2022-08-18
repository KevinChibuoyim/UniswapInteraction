import { ethers } from "hardhat";

// Script that interacts with at least two functions on 
// uniswap router contract

async function main() {

    //Getting the deployed contract addresses of the two tokens
    //and the uniswap router contrace, as well as intended liquidity amount

    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const BUSDAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const SHIBA_INUAddress = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
    const LiquidityAmountBUSD = 1000;
    const LiquidityAmountSHIBA = 1000;

    //cloning an address that has the busd token on mainnet, to sign our transactions

    const helpers = require("@nomicfoundation/hardhat-network-helpers");
  const BUSDHolder = "0x286AF5CF60aE834199949bBc815485f07CC9C644";
  await helpers.impersonateAccount(BUSDHolder);
  const impersonatedSigner = await ethers.getSigner(BUSDHolder);

  //approving our transaction with the cloned valid address

  const BUSD = await ethers.getContractAt("IERC20", BUSDAddress, impersonatedSigner);
  const SHIBA = await ethers.getContractAt("IERC20", SHIBA_INUAddress);
  const ROUTER = await ethers.getContractAt("IUniswap", UNIRouter, impersonatedSigner);

  await BUSD.approve(UNIRouter, LiquidityAmountBUSD);
  await BUSD.approve(UNIRouter, LiquidityAmountSHIBA);

  //checking balance of our addresses before providing liquidity
  const BusdBalanceBefore = await BUSD.balanceOf(BUSDAddress);
  const ShibaBalanceBefore = await SHIBA.balanceOf(SHIBA_INUAddress);

  console.log("Balance of each before providing liquidity:", BusdBalanceBefore);

  const deadline = Math.floor(Date.now()/1000) + (60*10);

  await ROUTER.addLiquidity(
        BUSDAddress,
        SHIBA_INUAddress ,
        LiquidityAmountBUSD,
        LiquidityAmountSHIBA,
        500,
        500,
        BUSDHolder,
        1660863510
  );


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
