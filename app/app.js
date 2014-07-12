'use strict';

/* jshint -W079: false */
var App = angular.module('app', [
  'ngAnimate', 'ngSanitize', 'ui.router'
]);


App.config(function ($stateProvider, $urlRouterProvider, SECTIONS) {
  $stateProvider
    .state('start', {
      url: '/',
      templateUrl: 'partials/start.html'
    });

    //Create state for each main section based on slugs
    _.each(SECTIONS, function (section) {
      $stateProvider.state(section.slug, {
        url: '/' + section.slug,
        templateUrl: 'partials/' + section.slug + '.html'
      });
      return;
    });
    
    $urlRouterProvider.otherwise('/');
    return;
});