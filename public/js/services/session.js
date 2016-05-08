'use strict';

/*
 * In this service the user data is defined for the current session. Within
 * angular current session is until the page is refreshed. When the page is
 * refreshed the user is reinitialized through $window.sessionStorage at the
 * login.js file.
 */
angular.module('indexApp').service('Session', function($rootScope, USER_ROLES) {

	this.create = function(user) {
		var displayUser = 
		{
		    "username": user.username,
            "password": user.password,
            "userRole": user.userRole
        };

		console.log(displayUser);
		this.user = user;
		this.userRole = user.userRole;
	};
	this.destroy = function() {
		if (this.user != null) {
			var displayUser = 
			{
			    "username": this.user.username,
	            "password": this.user.password,
	            "userRole": this.user.userRole
	        };
	    }
		console.log(displayUser);
		this.user = null;
		this.userRole = null;
	};
	return this;
});