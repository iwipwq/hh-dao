import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  VOTING_PERIOD,
  VOTING_DELAY,
  QUORUM_PERCENTAGE,
} from "../helper-hardhat-config";

const deployGovernorContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log, get } = deployments;

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  log("가버너 배포중...");

  // constructor(
  //     IVotes _token,
  //     TimelockController _timelock,
  //     uint256 _votingDelay,
  //     uint256 _votingPeriod,
  //     uint256 _quorumPercentage
  // )

  const governorContract = await deploy("GovernorContracts", {
    from: deployer,
    log: true,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
  });
};

export default deployGovernorContract;
