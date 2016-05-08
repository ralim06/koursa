'use strict';

angular.module('indexApp')
.controller('LoginCtrl', [ '$scope', '$state', '$modalInstance' , '$window', 'Auth', 
function($scope, $state, $modalInstance, $window, Auth ) {
	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;
	
	//when the form is submitted
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.loginForm.$invalid) {
			$scope.login($scope.credentials);
		} else {
			$scope.error = true;
			return;
		}
	};

	//Performs the login function, by sending a request to the server with the Auth service
	$scope.login = function(credentials) {
		$scope.error = false;
		Auth.login(credentials, function(user) {
			//success function
			$modalInstance.close();
			$state.go('private');
		}, function(err) {
			console.log("error");
			$scope.error = true;
		});
	};
	
	// if a session exists for current user (page was refreshed)
	// log him in again
	if ($window.sessionStorage["userInfo"]) {
		var credentials = JSON.parse($window.sessionStorage["userInfo"]);
		$scope.login(credentials);
	}

} ])

.controller('HeaderCtrl', ["$scope","MenuService","Auth",
function($scope, MenuService, Auth) {
    $scope.$parent.menus = MenuService.all();
    $scope.$parent.isAuthenticated = Auth.isAuthenticated();
    console.log($scope.$parent.isAuthenticated);
}])

.controller('SearchController', ['$scope', '$location', '$http', '$q', function($scope, $location, $http, $q) {
    $scope.$parent.showResults = false;
    $scope.$parent.showSearch = true;
    $scope.$parent.searchCriteria = {startCity: "Béjaia", endCity: "Gualma"};
    $scope.submit = function(searchCriteria) {
        $scope.$parent.showResults = true;
        $scope.$parent.showSearch = false;
        $location.path( "/results" );
    };
}])

.controller('ResultsController', function($scope, $http) {
    $scope.$parent.showSearch = false;
    $scope.$parent.showResults = true;
    $http.get("/course")
    .then(function (response) {
        $scope.$parent.results = response.data;
    });
})

.controller('PrivateController', function($scope, $http) {
	
	$scope.isAuthenticated = $scope.$parent.isAuthenticated;
})

.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        this.postForm = function() {
        
            var encodedString = 'username=' +
                encodeURIComponent(this.inputData.username) +
                '&password=' +
                encodeURIComponent(this.inputData.password);
                
            $http({
                method: 'GET',
                url: '/user',
                data: encodedString,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data, status, headers, config) {
                console.log(data);
                if ( data != null && data.length == 1 && data[0].user_login == jQuery("#inputUsername").val() 
                    && data[0].user_passwd == jQuery("#inputPassword").val()) {
                    $location.path( "/success" );
                } else {
                    $scope.errorMsg = "Login not correct";
                }
            })
            .error(function(data, status, headers, config) {
                $scope.errorMsg = 'Unable to submit form';
            })
        }
        
    }])

.controller('PostController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        this.postForm = function() {
        
            var encodedString = 'username=' +
                encodeURIComponent(this.inputData.username) +
                '&password=' +
                encodeURIComponent(this.inputData.password);
                
            $http({
                method: 'GET',
                url: '/user',
                data: encodedString,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data, status, headers, config) {
                console.log(data);
                if ( data != null && data.length == 1 && data[0].user_login == jQuery("#inputUsername").val() 
                    && data[0].user_passwd == jQuery("#inputPassword").val()) {
                    $location.path( "/success" );
                } else {
                    $scope.errorMsg = "Login not correct";
                }
            })
            .error(function(data, status, headers, config) {
                $scope.errorMsg = 'Unable to submit form';
            })
        }
        
    }]);