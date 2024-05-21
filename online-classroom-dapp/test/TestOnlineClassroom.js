const OnlineClassroom = artifacts.require("OnlineClassroom");
contract("OnlineClassroom", function(accounts) {
    it("should retrieve a student's details correctly", async function() {
        const onlineClassroom = await OnlineClassroom.deployed();

        const student = await onlineClassroom.viewStudent(0);

        assert.equal(student[0].toNumber(), 1, "ID should be 1");
        assert.equal(student[1], "Alice", "Name should be Alice");
        assert.equal(student[2].toNumber(), 20, "Age should be 20");
    });
});
