'use strict';

App.controller('HomeCtrl',
  function ($scope, $rootScope, $state, home, sections, HOME_STAR) {

    $rootScope.pageTitle = "Home";

    $scope.homeContent = home;
    $scope.isComingSoon = home.isComingSoon;
    $scope.sections = sections;
    $scope.expandedSection = null;
    $scope.starPath = HOME_STAR;
    
    $scope.expandSection = function (section) {
      if ($scope.expandedSection === section) {
        $scope.expandedSection = null;
        $scope.starPath = HOME_STAR;
      }
      else {
        $scope.expandedSection = section;
        $scope.starPath = section.config.star;
      }
    };

  }
);
