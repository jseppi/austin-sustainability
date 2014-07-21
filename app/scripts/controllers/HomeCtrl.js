'use strict';

App.controller('HomeCtrl',
  function ($scope, $state, HOME_STAR, sections) {

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
