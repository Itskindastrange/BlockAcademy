App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access")
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('OnlineClassroom.json', function(data) {
      var OnlineClassroomArtifact = data;
      App.contracts.OnlineClassroom = TruffleContract(OnlineClassroomArtifact);
      App.contracts.OnlineClassroom.setProvider(App.web3Provider);
      return App.loadStudents();
    });
  },

  loadStudents: function() {
    var onlineClassroomInstance;

    App.contracts.OnlineClassroom.deployed().then(function(instance) {
      onlineClassroomInstance = instance;
      return onlineClassroomInstance.getTotalStudents.call();
    }).then(function(totalStudents) {
      for (var i = 0; i < totalStudents; i++) {
        onlineClassroomInstance.viewStudent(i).then(function(student) {
          var studentTemplate = $($('#studentTemplate').html());
          studentTemplate.find('.student-id').text(student[0]);
          studentTemplate.find('.student-name').text(student[1]);
          studentTemplate.find('.student-age').text(student[2]);

          $('#studentsTable').append(studentTemplate);
        });
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleFileUpload: function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('file');
    var fileName = fileInput.files[0].name;

    App.contracts.OnlineClassroom.deployed().then(function(instance) {
      return instance.submitFile(1, fileName, {from: web3.eth.accounts[0]}); 
    }).then(function(result) {
      console.log('File name stored successfully');
      var table = document.getElementById('fileTable');
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = fileName;
    }).catch(function(err) {
      console.error(err);
    });
  },

  registerStudentAddress: function(studentId, studentAddress) {
    App.contracts.OnlineClassroom.deployed().then(function(instance) {
      return instance.registerStudentAddress(studentId, studentAddress, {from: web3.eth.accounts[0]});
    }).then(function(result) {
      console.log('Student address registered successfully');
    }).catch(function(err) {
      console.error(err);
    });
  },

  markAttendance: function(studentId) {
    App.contracts.OnlineClassroom.deployed().then(function(instance) {
      return instance.markAttendance(studentId, {from: web3.eth.accounts[0]});
    }).then(function(result) {
      console.log('Attendance marked successfully');
    }).catch(function(err) {
      console.error(err);
    });
  },

  makeAnnouncement: function(studentId, announcement) {
    App.contracts.OnlineClassroom.deployed().then(function(instance) {
      return instance.makeAnnouncement(studentId, announcement, {from: web3.eth.accounts[0]});
    }).then(function(result) {
      console.log('Announcement made successfully');
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

$(document).ready(function() {
  $('#uploadForm').submit(App.handleFileUpload);
});

$(document).ready(function() {
  $('#markAttendanceButton').click(function() {
    var studentId = 1; // The student ID
    var studentAddress = web3.eth.accounts[0]; // The student's Ethereum address
    App.registerStudentAddress(studentId, studentAddress);
    App.markAttendance(studentId);
  });

  $('#makeAnnouncementButton').click(function() {
    var studentId = 1; // The student ID
    var studentAddress = web3.eth.accounts[0]; // The student's Ethereum address
    App.registerStudentAddress(studentId, studentAddress);
    App.makeAnnouncement(studentId, announcement);
    
  });

  $('#signInButton').click(function() {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(function(accounts) {
        var account = accounts[0];
        window.location.href = 'dashboard.html'; 
      }).catch(function(error) {
        console.error(error);
      });
    } else {
      alert('Please install MetaMask!');
    }
  });
});
