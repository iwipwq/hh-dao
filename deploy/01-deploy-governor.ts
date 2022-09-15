import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();
  log("거버넌스 토큰 배포중...");
  const governanceToken = await deploy("GoveranceToken", {
    from: deployer,
    args: [],
    log: true,
  })
  log(`${governanceToken.address} 에 배포됨`)

  await delegate(governanceToken.address,deployer);
  log("대리호출됨(delegated)")
};

const delegate = async (governanceTokenAddress:string, delegatedAccount:string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken",governanceTokenAddress)
    const tx = await governanceToken.delegate(delegatedAccount);
    await tx.wait(1);
    // 몇개의 체크포인트를 가지고 있는지 확인
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

export default deployGovernanceToken;
