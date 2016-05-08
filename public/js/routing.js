angular.module('indexApp').config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("search");
  
  // Now set up the states
  $stateProvider
      .state('login', {
          url: "/login",
          templateUrl: "views/login.html",
          controllerAs: "LoginCtrl",
          data: {
              authorizedRoles: [USER_ROLES.all /*USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest*/]
          }
      })
    .state('search', {
      url: "/search",
      templateUrl: "views/search.html",
      controllerAs: "SearchController",
      data: {
          authorizedRoles: [USER_ROLES.all]
      }
    })
    .state('results', {
      url: "/results",
      templateUrl: "views/results.html",
      controllerAs: "ResultsController",
      data: {
          authorizedRoles: [USER_ROLES.all]
      }
    })
  	.state('private', {
      url: "/private",
      templateUrl: "views/private.html",
      controllerAs: "PrivateController",
      data: {
          authorizedRoles: [USER_ROLES.admin]
      }
    })
    .state('page-not-found', {
         url: '/page-not-found',
         templateUrl: 'views/404.html',
         data: {
             displayName: false
         }
     })
    ;
}]);