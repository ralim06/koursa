var app = angular.module('indexApp', [
    'materialDatePicker',
    'ngRoute'
]);

app.factory("UserService", function() {
  var users = ["Peter", "Daniel", "Nina"];

  return {
    all: function() {
      return users;
    },
    first: function() {
      return users[0];
    }
  };
});