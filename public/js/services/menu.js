'use strict';

angular.module('indexApp')
.factory("MenuService", function() {
    var itemsOfMenu = 
        [
         {id: 0, label: 'Qui sommes nous ?', url:"#search"},
         {id: 1, label: 'Comment ça marcher ?', url:"#results"},
         {id: 2, label: 'Inscription', url:"#login"}
        ];

  return {
    all: function() {
      return itemsOfMenu;
    }
  };
});