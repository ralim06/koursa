var app = angular.module('indexApp', [
    'materialDatePicker',
    'ngRoute',
    'ngMessages'
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

app.controller('HeaderCtrl', ["$scope","MenuService",
    function($scope, MenuService) {
        var self = this;
        $scope.$parent.isEdition = false;
        $scope.$parent.menus = MenuService.all();
    }]);


app.controller('SearchCtrl', ["$scope",
    function($scope) {
        $scope.searchCriteria = {startDate: "John", endDate: "Doe"};
        $scope.list = [];
    }]);

app.controller('InscriptionController', ["$scope",
    function($scope) {
        $scope.searchCriteria = {startDate: "John", endDate: "Doe"};
        $scope.list = [];
    }]);

app.controller('PostController', ['$scope', '$http', '$location', function($scope, $http, $location) {
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
            .success(function(data) {
                console.log(data);
                if ( data !== null && data.length === 1 && data[0].user_login === jQuery("#inputUsername").val() 
                    && data[0].user_passwd === jQuery("#inputPassword").val()) {
                    $location.path( "/success" );
                } else {
                    $scope.errorMsg = "Login not correct";
                }
            })
            .error(function() {
                $scope.errorMsg = 'Unable to submit form';
            });
        };
    }]);
