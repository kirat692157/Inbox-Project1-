pragma solidity ^0.4.17; // Version of solodity
contract Inbox{
    string public getMessage ; 
    
    function Inbox(string initialMessage) public {
     getMessage = initialMessage;
    }

    function setMessage(string newMessage) public{
        getMessage = newMessage;
    }
}
