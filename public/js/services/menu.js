'use strict';

angular.module('indexApp')
.factory("MenuService", function() {
    var itemsOfMenu = 
        [
         {label: 'Qui sommes nous ?', url:"#qui-sommes-nous"},
         {label: 'Foire à questions', url:"#faq"},
         {label: 'Inscription', url:"#inscription"},
         {label: 'Connexion', url:"#connexion"}
        ];

  return {
    all: function() {
      return itemsOfMenu;
    }
  };
});