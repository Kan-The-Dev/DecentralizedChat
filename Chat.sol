
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedChat {
    struct Message {
        address sender;
        string text;
        uint256 timestamp;
    }

    mapping(address => Message[]) private messages;

    event MessageSent(address indexed sender, address indexed receiver, string text, uint256 timestamp);

    function sendMessage(address _receiver, string memory _text) public {
        require(bytes(_text).length > 0, "Message cannot be empty");
        messages[_receiver].push(Message(msg.sender, _text, block.timestamp));
        emit MessageSent(msg.sender, _receiver, _text, block.timestamp);
    }

    function getMessages() public view returns (Message[] memory) {
        return messages[msg.sender];
    }
}
