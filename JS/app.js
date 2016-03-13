"use strict";

angular.module("MyCustomModule", [
	'ngRoute',
	'usersService'
])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './src/tmpl1.html',
			controller: "mainController"
		})
		.when('/page1', {
			templateUrl: './src/page1.html',
			controller: "PageOneController",
			resolve: {
      			"users": function( $q, $http, USERS ) {
      				return $http({
						method: 'GET',
						url: '/src/data/users.json'
					}).then(function successCallback(response) {
						USERS.push.apply(USERS, response.data)
					});
      			}
  			}
		})
		.otherwise({
			redirectTo: '/'
		});
})

.controller("mainController", function ($scope) {
	$scope.activeRoom = null;
	var currentUser = null;

	var USERS = new Firebase('https://chattest-wa-2016.firebaseio.com/USERS/');
	USERS.on('child_added', function(snapshot) {
		console.log( snapshot.key(), snapshot.val() );

		var usr = Object.assign({ key: snapshot.key() }, snapshot.val());

		if(usr.name == 'onomatoipio') {
			currentUser = usr;
		}

		$scope.users.push(usr);
		if($scope.$$phase !== '$apply' && $scope.$$phase !== '$digest') {
			$scope.$apply();
		}
	});
	$scope.users = [];
	$scope.userAdd = function() {
		USERS.push({ name: $scope.userName });
	};

	var ROOMS = new Firebase('https://chattest-wa-2016.firebaseio.com/ROOMS/');
	ROOMS.on('child_added', function(snapshot) {
		console.log( snapshot.key(), snapshot.val() );

		$scope.activeRoom = Object.assign({ key: snapshot.key() }, snapshot.val());
		$scope.activeRoom.ref = new Firebase('https://chattest-wa-2016.firebaseio.com/ROOMS/'+$scope.activeRoom.key+'/messages/');
		$scope.activeRoom.ref.on('child_added', function(snapshot) {
			$scope.messages.push(
				Object.assign({ key: snapshot.key() }, snapshot.val())
			)
		});

		$scope.rooms.push(
			$scope.activeRoom
		);
		if($scope.$$phase !== '$apply' && $scope.$$phase !== '$digest') {
			$scope.$apply();
		}
	});
	$scope.rooms = [];
	$scope.roomInit = function(opponent) {
		ROOMS.push({
			members: [opponent, currentUser.key]
		});
	};

	$scope.messages = [];
	$scope.messageSend = function() {
		$scope.activeRoom.ref.push({
			user: currentUser.key,
			message: "----------->>>>>" + Math.random()
		});
	};

})

.controller("PageOneController", function ($scope, UsersService) {
	$scope.data = 'The PAGE 1 data string once again some data passed...';
	$scope.users = UsersService.get();
})

.value('USERS', []);
