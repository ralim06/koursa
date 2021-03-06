'use strict';

angular.module('indexApp').
controller('ParentController', ['$scope', '$rootScope', '$modal', 'Auth', 'AUTH_EVENTS','USER_ROLES',
function($scope, $rootScope, $modal, Auth, AUTH_EVENTS, USER_ROLES){
	// this is the parent controller for all controllers.
	// Manages auth login functions and each controller
	// inherits from this controller	

	
	$scope.modalShown = false;
	var showLoginDialog = function() {
		if(!$scope.modalShown){
			$scope.modalShown = true;
			var modalInstance = $modal.open({
				templateUrl : 'views/loginPopin.html',
				controller : "LoginCtrl",
				backdrop : 'static',
			});

			modalInstance.result.then(function() {
				$scope.modalShown = false;
			});
		}
	};
	
	var setCurrentUser = function(){
		console.log('login succes');
		$scope.isAuthenticated = true;
		$scope.currentUser = $rootScope.currentUser;
	}
	
	var showNotAuthorized = function(){
		alert("Not Authorized");
	}
	
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = Auth.isAuthorized();

	//$scope.isAuthenticated = Auth.isAuthenticated();

	//listen to events of unsuccessful logins, to run the login dialog
	$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
	
} ]);