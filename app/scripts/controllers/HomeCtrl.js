'use strict';

App.controller('HomeCtrl', function ($scope, $state, sections) {

  $scope.sections = sections;

  $scope.expandedSection = null;
  
  $scope.expandSection = function (section) {
    if ($scope.expandedSection === section) {
      $scope.expandedSection = null;
    }
    else {
      $scope.expandedSection = section;
    }
  };

});
