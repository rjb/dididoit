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

  	// Deletes all the tasks from local storage
    $scope.deleteAllTasks = function() {
    	$scope.tasks = [];
    	localStorageService.clearAll();
    	localStorageService.add('tasks', []);
    };

    // Adds task to array and local storage
    $scope.addTask = function() {
    	var localStorageTasks = localStorageService.get('tasks');
    	var task = {id: localStorageTasks.length, desc: $scope.newTask.desc, status: "incomplete", showDrawer: false}
    	
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
    	if (task.status == "incomplete") {
    		$scope.tasks[$scope.tasks.indexOf(task)].status = "complete";
    	} else {
    		$scope.tasks[$scope.tasks.indexOf(task)].status = "incomplete";
    	}

    	localStorageService.add('tasks', $scope.tasks);
    };

    // Deletes task from array and local storage
    $scope.deleteTask = function(task) { 	
 		$scope.tasks.splice([$scope.tasks.indexOf(task)], 1);
    	localStorageService.add('tasks', $scope.tasks);
    	forceOpenNewTaskForm();
    };

    // Mark all tasks incomplete. Not being used anywhere
    $scope.markAllIncomplete = function() {
    	for (var i = 0; i < $scope.tasks.length; i++) {
    		$scope.tasks[i].status = "incomplete";
    	}

    	localStorageService.add('tasks', $scope.tasks);
    };

	// Opens and closes the new task form
    $scope.openCloseNewTaskForm = function() {
    	$scope.showNewTaskForm = !$scope.showNewTaskForm;
    };

    // Opens and closes the "tools" drawer for each task
    $scope.openCloseDrawer = function(task) {
		return task.showDrawer = !task.showDrawer;
    };

    init();

    function init() {
        startClearing();
    	initTaskStorageService();
		forceOpenNewTaskForm();
    };
  });
