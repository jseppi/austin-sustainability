'use strict';

/* jshint -W079: false */
var App = angular.module('app', [
  'ngAnimate', 'ngSanitize', 'ngTouch', 'ui.router'
]);


App.config(function ($stateProvider, $urlRouterProvider, SECTIONS) {
  $stateProvider
    .state('start', {
      url: '/',
      templateUrl: 'partials/start.html'
    });


    //Create state for each main section based on slugs
    _.each(SECTIONS, function (section) {
      $stateProvider.state(section, {
        url: '/' + section,
        templateUrl: 'partials/section.html'
      });
      return;
    });
    
    $urlRouterProvider.otherwise('/');
    return;
});

App.run(function ($http, $templateCache, CONTENT_PATH, SECTIONS) {
  //Preload the templateCache with each of the section configs 
  _.each(SECTIONS, function (section) {
    var path = CONTENT_PATH + section + ".yml";
    $http.get(path)
      .success(function (sectionConfig) {
        $templateCache.put(path, sectionConfig);
      });
  });
});