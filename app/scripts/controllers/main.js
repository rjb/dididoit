// todo:
// - Edit task
// - Mark items incomplete each morning with $interval (for when browser is open)
// 	  and when user closes their browser and $interval is no longer running.
// X add created_at and completed_at
// X Add completed_at update to changeStatus() function
// X Reset completed_at status to "" on incomplete flip

'use strict';

angular.module('didiApp')
  .controller('MainCtrl', function ($scope, $interval, localStorageService) {
  	$scope.showNewTaskForm = false;
 	$scope.tasks = localStorageService.get('tasks');

 	// Initializes the storage service and tasks array if null
    var initTaskStorageService = function() {
      	if ($scope.tasks === null) {
  			localStorageService.add('tasks', []);
  			$scope.tasks = [];
  		};
  	};

  	// If no tasks force open the new task form
  	var forceOpenNewTaskForm = function() {
    	if ($scope.tasks.length === 0 && $scope.showNewTaskForm === false) $scope.showNewTaskForm = true;
    };

    // Returns the number of milliseconds until midnight
    var millisecondsTilMidnight = function() {
    	var midnight = new Date();
    	midnight.setHours(24, 0, 0, 0);
    	return (midnight.getTime() - new Date().getTime());
    };

  	// Starts the $interval delay for x milliseconds 'til Midnight and marks all tasks incomplete
  	// This is for when the browser is left open
  	// TODo: IMPLEMENT $scope.markAllIncomplete
  	var startClearing = function() {
  		$interval(function(){
  			for (var i = 0; i < $scope.tasks.length; i++) {
    			$scope.tasks[i].status = "incomplete";
    		}
	
    		localStorageService.add('tasks', $scope.tasks);
  		}, millisecondsTilMidnight());
  	};

 	// Stops the $interval from clearing tasks
  	var stopClearing = function() {
  	};

  	// NOT WORKING YET!!!!!!!!!!
  	// Clears all completed items if one had been completed "yesterday" or earlier
  	// For when browser is loaded, i.e. not left opened
  	var clearOnLoad = function() {
  	  	var completed_at;

  		var yesterday = new Date();
  		yesterday.setDate(yesterday.getDay() - 1);
  		yesterday = yesterday.getDay() + "-" + yesterday.getMonth() + "-" + yesterday.getFullYear();

  		for (var i = 0; i < $scope.tasks.length; i++) {
  			completed_at = $scope.tasks[i].completed_at.getDate() + "-" + $scope.tasks[i].completed_at.getMonth() + "-" + year = $scope.tasks[i].completed_at.getFullYear();

    		if (completed_at === yesterday) {
    			$scope.markAllIncomplete();
    			break;
    		}
    	}
  	};

    // Adds task to array and local storage
    $scope.addTask = function() {
    	var localStorageTasks = localStorageService.get('tasks');
    	var task = { id: localStorageTasks.length,
    				 created_at: new Date(),
    				 completed_at: "",
    				 desc: $scope.newTask.desc,
    				 status: "incomplete",
    				 showDrawer: false }
    	
    	localStorageTasks.push(task);

		localStorageService.add('tasks', localStorageTasks);

    	$scope.newTask.desc = "";
    	$scope.tasks = localStorageService.get('tasks');
    };

    // Opend edit for for given task
    $scope.editTask = function(task) {
    	alert("Edit support coming soon.");
    };

    // Flips the status back and forth
    $scope.changeStatus = function(task) {
    	// Force the drawer closed otherwise it can get stuck open
    	task.showDrawer = false;

    	if (task.status == "incomplete") {
    		task.status = "completed";
    		task.completed_at = new Date();
    	} else {
    		task.status = "incomplete";
    		task.completed_at = "";
    	}

    	localStorageService.add('tasks', $scope.tasks);
    };

    // Deletes task from array and local storage
    $scope.deleteTask = function(task) { 	
 		$scope.tasks.splice(task, 1);
    	localStorageService.add('tasks', $scope.tasks);
    	forceOpenNewTaskForm();
    };

    // Marks all tasks incomplete
    $scope.markAllIncomplete = function() {
    	for (var i = 0; i < $scope.tasks.length; i++) {
    		// Force the drawer closed otherwise it can get stuck open
    		$scope.tasks[i].showDrawer = false;
    		
    		$scope.tasks[i].status = "incomplete";
    		$scope.tasks[i].completed_at = "";
    	}

    	localStorageService.add('tasks', $scope.tasks);
    };

    // Deletes all the tasks from local storage
    $scope.deleteAllTasks = function() {
    	$scope.tasks = [];
    	localStorageService.clearAll();
    	localStorageService.add('tasks', []);
    };

    // Returns true if there are ANY completed tasks
    $scope.anyCompletedTasks = function() {
    	for (var i = 0; i < $scope.tasks.length; i++) {
    		if ($scope.tasks[i].status === "completed") {
    			return true;
    			break;
    		}
    	}
    	return false;
    };

    $scope.tellMe = function(task) {
    	alert(task.completed_at);
    };

	// Opens and closes the new task form
    $scope.openCloseNewTaskForm = function() {
    	$scope.showNewTaskForm = !$scope.showNewTaskForm;
    };

    // Opens and closes the "tools" drawer for each task
    $scope.openCloseDrawer = function(task) {
		task.showDrawer = !task.showDrawer;
    };

    init();

    function init() {
        startClearing();
    	initTaskStorageService();
		forceOpenNewTaskForm();
    };
  });
