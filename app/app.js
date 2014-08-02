'use strict';

/* jshint -W079: false */
var App = angular.module('app', [
  'ngAnimate', 'ngSanitize', 'ngTouch', 'ui.router'
]);


App.config(function ($stateProvider, $urlRouterProvider, SECTIONS) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      resolve: {
        home: function (HomeService) {
          return HomeService.getContent();
        },
        sections: function (SectionService) {
          return SectionService.getSections();
        }
      }
    });


    //Create state for each main section based on slugs
    _.each(SECTIONS, function (section) {
      $stateProvider.state(section, {
        url: '/' + section,
        templateUrl: 'partials/section.html',
        controller: 'SectionCtrl',
        resolve: {
          sections: function (SectionService) {
            return SectionService.getSections();
          }
        }
      });
      return;
    });
    
    $urlRouterProvider.otherwise('/');
    return;
});

App.run(function (SectionService, HomeService) {
  SectionService.getSections();
  HomeService.getContent();
});
