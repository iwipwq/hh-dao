import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const setupContracts: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const timeLock = await ethers.getContract("TimeLock", deployer);
  const governor = await ethers.getContract("GovernorContract", deployer);

  log("역할 분담중...");

  // TimelockController
  const proposerRole = await timeLock.PROPERSER_ROLE();
  const executorRole = await timeLock.EXECUTRO_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  // 가버너만 결정할 수 있게
  const proposerTx = await timeLock.grantRole(proposerRole, governor.address);
  await proposerTx.wait(1);
  // 실행권한을 모두에게 -> 빈 주소에 할당하면 됨
  const executorTx = await timeLock.grantRole(
    executorRole,
    ethers.constants.AddressZero
  );
  await executorTx.wait(1);
  // deployer가 Timelock Controller를 소유하고 있기 떄문에 위와 같은 트랜잭션이 가능

  // AccessControl.sol
  // function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
  //   _revokeRole(role, account);
  // }

  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait(1);
};

export default setupContracts;
