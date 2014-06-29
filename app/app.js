(function(){
	'use strict';

	angular.module('austin-sustainability', [ 'ngRoute','austin-sustainability-main','templates' ])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .otherwise({
	        redirectTo: '/'
	      });
	  });
	  
})();