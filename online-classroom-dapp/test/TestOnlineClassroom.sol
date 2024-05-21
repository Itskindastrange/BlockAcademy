pragma solidity ^0.5.16;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OnlineClassroom.sol";

contract TestOnlineClassroom {
    OnlineClassroom onlineClassroom = OnlineClassroom(DeployedAddresses.OnlineClassroom());

    // Testing retrieval of a single student's details
    function testUserCanViewStudent() public {
        uint id;
        string memory name;
        uint age;
        (id, name, age) = onlineClassroom.viewStudent(0);

        uint expectedId = 1;
        string memory expectedName = "Alice";
        uint expectedAge = 20;

        Assert.equal(id, expectedId, "ID of the first student should be recorded.");
        Assert.equal(name, expectedName, "Name of the first student should be recorded.");
        Assert.equal(age, expectedAge, "Age of the first student should be recorded.");
    }

    // Testing retrieval of total students
    function testUserCanViewTotalStudents() public {
        uint totalStudents = onlineClassroom.getTotalStudents();

        uint expected = 3;

        Assert.equal(totalStudents, expected, "Total students should be recorded.");
    }
}
