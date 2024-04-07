//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract AMM {
    Token public token1;
    Token public token2;

    uint256 public token1Balance;
    uint256 public token2Balance;
    uint256 public K;

    uint256 public totalShares;
    mapping(address => uint256) public shares;
    uint256 constant PRECISION = 10 **18;

    constructor(Token _token1, Token _token2) {
        token1 = _token1;
        token2 = _token2;
    }

    function addLiquidity(uint256 _token1Amount, uint256 _token2Amount) external {
        require(token1.transferFrom(msg.sender, address(this), _token1Amount), 'failed to tranfer token 1');
        require(token2.transferFrom(msg.sender, address(this), _token1Amount), 'failed to tranfer token 2');



        uint256 share;
        if (totalShares == 0) {
            share = 100 * PRECISION;
        } else {
            uint256 share1 = (totalShares *_token1Amount) / token1Balance;
            uint256 share2 = (totalShares *_token2Amount) / token2Balance;
        }

        // manage pool
        token1Balance += _token1Amount;
        token2Balance += _token2Amount;
        K = token1Balance * token2Balance;

        // updates shares
        totalShares += share;
        shares[msg.sender] += share;

    }
}