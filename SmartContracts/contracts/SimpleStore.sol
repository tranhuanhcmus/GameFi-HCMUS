// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleStore {
  uint256 value;

  event NewValueSet(uint256 indexed _value, address _sender);

  function set(uint256 newValue) public {
    value = newValue;
    emit NewValueSet(value, msg.sender);
  }

  function get() public view returns (uint256) {
    return value;
  }
}
