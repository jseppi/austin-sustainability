'use strict';

/* jshint -W079: false */
var App = angular.module('app', [
  'ngAnimate', 'ngSanitize', 'ui.router'
]);


App.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('start', {
      url: '/',
      templateUrl: 'partials/start.html'
    })
    .state('climate_and_energy', {
      url: '/climate_and_energy',
      templateUrl: 'partials/climate_and_energy.html'
    })
    ;

    $urlRouterProvider.otherwise('/');
    return;
});