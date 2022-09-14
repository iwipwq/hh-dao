// 사실상 소유자를 나타내는 추가적이 계약 GovernorContract와 같지만 boxContract의 실질적 소유자
// 새 투표가 "실시" 되기를 기다리고 싶을때

// 만약, 거버넌스 토큰을 가지고 있는 모든 사람은 5토큰씩 지불해야한다고 칠때
// 여기에 동참하기 싫어하는 사람들도 있을 수 있음, 따라서

// 거버넌스 업데이트가 마음에 들지않는 유저에게 "나갈수 있는" 시간을 부여

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    // minDelay: How long you have to wait before executing
    // proposers is the list of addresses that can propose
    // executors: Who can execute when a proposal passes
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) TimelockController(minDelay, proposers, executors) {}
}