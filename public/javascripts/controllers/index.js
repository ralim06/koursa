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
            .when('/', {
                templateUrl: 'index.html',
                controller: 'HeaderCtrl'
            })
            .when('/liste', {
                templateUrl: 'views/liste.html',
                controller: 'ListeCtrl'
            })
            .when('/AddNewOrder', {
                templateUrl: 'views/liste.html',
                controller: 'AddOrderController'
            })
            .when('/ShowOrders', {
                templateUrl: 'views/liste.html',
                controller: 'ShowOrdersController'
            })
            .otherwise ({
                redirectTo: '/login'
            });
    }
]);

app.controller('AddOrderController', function($scope) {

    $scope.message1 = 'This is Add new order screen';

});


app.controller('ShowOrdersController', function($scope) {

    $scope.message1 = 'This is Show orders screen';

});

app.controller('HeaderCtrl', ["$scope",
        function($scope) {
            var self = this;
            $scope.$parent.isEdition = false;
            $scope.$parent.qcms = [
                {id: 0, label: 'First QCM', url:"url1"},
                {id: 1, label: 'Second QCM', url:"url1"},
                {id: 2, label: 'Third QCM', url:"url1"}
            ];

            self.delete = function(qcm){
                qcm.isDeleted = true;
            };

            self.create = function(){
                self.displayCreate =  true;
            };

            self.getClassCss = function(reponse) {
                return {
                    correct: reponse.isCorrect,
                    notcorrect: !reponse.isCorrect
                };
            };
        }])


app.controller('SearchCtrl', ["$scope",
    function($scope) {
        $scope.searchCriteria = {startDate: "John", endDate: "Doe"};
        $scope.list = [];
        var self = this;
        self.isFormValid = function(reponse) {
            //test the new scope variable
            console.log('form valid?: ', $scope.formSearch);
        };

        self.submit = function() {
            alert('SUBMIT');
            $scope.list.push("OK");
        };
    }])

// Waiting for the DOM ready...
$(function(){

    // applied typeahead to the text input box
    $('#start').typeahead({
        name: 'countries',
        // data source
        prefetch: 'public/data/countries.json',
        // max item numbers list in the dropdown
        limit: 10,

    });
    $('#end').typeahead({
        name: 'countries',
        // data source
        prefetch: 'public/data/countries.json',
        // max item numbers list in the dropdown
        limit: 10,

    });

    $(function () {
        $("#datepicker").datepicker({
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());;
    });
});