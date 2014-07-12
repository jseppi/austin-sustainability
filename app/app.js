'use strict';


/* jshint -W079: false */
var App = angular.module('app', [
  'ngCookies', 'ngResource', 'ui.router'
]);


App.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('start', {
      url: '/',
      templateUrl: 'partials/start.html'
    });
    // .when('/', {
    //   templateUrl: 'partials/start.html'
    // })
    // .when('/climate_and_energy', {
    //   templateUrl: 'partials/climate_and_energy.html'
    // })
    // //TODO: The other 6 main categories 
    // .otherwise({
    //   redirectTo: '/'
    // });

    $urlRouterProvider.otherwise('/');
    return;
});