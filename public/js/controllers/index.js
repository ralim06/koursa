var app = angular.module('indexApp', [
    'materialDatePicker',
    'ngRoute'
]);

/**
 * Configuration du module principal : routeApp
 */
app.config(['$routeProvider',
    function($routeProvider) {
        // Système de routage
        $routeProvider
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchController'
            })
            .when('/results', {
                templateUrl: 'views/results.html',
                controller: 'ResultsController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'PostController'
            })
            .when('/success', {
                templateUrl: 'views/success.html',
                controller: 'SuccessController'
            })
            .otherwise({
                redirectTo: '/search'
            });
    }
]);

app.controller('SearchController', ['$scope', '$location', '$http', '$q', function($scope, $location, $http, $q) {
    $scope.showResults = false;
    $scope.showSearch = true;
    $scope.submit = function(searchCriteria) {
        $scope.$parent.showResults = true;
        $scope.$parent.showSearch = false;
        $location.path( "/results" );
    };
}]);

app.controller('ResultsController', function($scope, $http) {
    $scope.showSearch = false;
    $scope.showResults = true;
    $http.get("/course")
    .then(function (response) {
        $scope.results = response.data;
    });
});

app.controller('HeaderCtrl', ["$scope",
    function($scope) {
        var self = this;
        $scope.$parent.isEdition = false;
        $scope.$parent.menus = [
            {id: 0, label: 'Qui sommes nous ?', url:"#login"},
            {id: 1, label: 'Comment ça marcher ?', url:"#login"},
            {id: 2, label: 'Inscription', url:"#login"},
            {id: 3, label: 'Connexion', url:"#login"}
        ];
    }]);


app.controller('SearchCtrl', ["$scope",
    function($scope) {
        $scope.searchCriteria = {startDate: "John", endDate: "Doe"};
        $scope.list = [];
    }]);

app.controller('PostController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
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
                    console.log(UserService.all());
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


app.controller('SuccessController', ["$scope",
    function($scope) {
    }]
);