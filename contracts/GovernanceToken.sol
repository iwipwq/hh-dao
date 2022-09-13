// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000000000; // 1000000 eth

    constructor() ERC20("GovernanceToken", "GT") ERC20Permit("GovernanceToken"){
        _mint(msg.sender, s_maxSupply);
    }

    // The function below are overrides required by solidity
    // 토큰을 전송할때마다 ERC20Votes에서 _afterTokenTrasnfer를 호출, 나머지 함수도 마찬가지
    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20Votes) {
        super._burn(account, amount);
    }
}

// Someone knows a hot proposal is coming up 어떤 사람들이 미리 화재가 될 토콘을 알고 있고
// So they just buy a ton of tokens, adn then they dump it after 그 토큰을 미리 사들여 나중에 덤핑하려할 수 도 있음

// Snapshot 사람들이 일부 블럭에 토큰을 얼마나 가지고 있는지 스냅샷 생성

// 또한 proposal이 제안되었을때 그 전 상황과 비교하기 위한 과거의 block snapshot 생성
// 이를 위해 ERC20 extention인 ERC20Votes를 사용 -> 스냄샷, 체크포인트, 델리게이트 기능을 이용해 더 공정한 투표가능

