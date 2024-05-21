pragma solidity ^0.5.16;

contract OnlineClassroom {
    struct Student {
        uint id;
        string name;
        uint age;
    }

    Student[] public students;
    mapping(uint => string) public studentFiles;
    mapping(uint => bool) public studentAttendance;
    mapping(address => uint) public studentAddresses;
    mapping(uint => string) public studentAnnouncements;

    constructor() public {
        students.push(Student(1, "Alice", 20));
        students.push(Student(2, "Bob", 22));
        students.push(Student(3, "Charlie", 21));
    }

    function getTotalStudents() public view returns (uint) {
        return students.length;
    }

    function viewStudent(uint _index) public view returns (uint, string memory, uint) {
        return (students[_index].id, students[_index].name, students[_index].age);
    }

    function submitFile(uint _studentId, string memory _fileName) public {
        studentFiles[_studentId] = _fileName;
    }

    function viewFile(uint _studentId) public view returns (string memory) {
        return studentFiles[_studentId];
    }

    function markAttendance(uint _studentId) public {
        require(studentAddresses[msg.sender] == _studentId, "Invalid student address!");
        studentAttendance[_studentId] = true;
    }

    function registerStudentAddress(uint _studentId, address _studentAddress) public {
        studentAddresses[_studentAddress] = _studentId;
    }

    function makeAnnouncement(uint _studentId, string memory _announcement) public {
        studentAnnouncements[_studentId] = _announcement;
    }

    function viewAnnouncement(uint _studentId) public view returns (string memory) {
        return studentAnnouncements[_studentId];
    }
}
