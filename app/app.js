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
    //TODO: subsection routes using slugify() on subsection titles
    _.each(SECTIONS, function (section) {
      $stateProvider.state(section, {
        url: '/' + section + '/:subsection/',
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

App.run(function ($rootScope, SectionService, HomeService) {
  //prefetch content
  SectionService.getSections();
  HomeService.getContent();

  //set var to indicate if in node-webkit version
  $rootScope.isNodeWebkit = (typeof process === "object") && process.versions['node-webkit'];
  
  //set zoomLevel if in node-webkit to account for scaling bug in 
  // Windows 8 webkit on high DPI screens 
  if ($rootScope.isNodeWebkit) {
    var gui = require('nw.gui');
    var win = gui.Window.get();
    win.zoomLevel = 2;
  }
    
});
