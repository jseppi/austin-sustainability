'use strict';

App
  .controller('AppCtrl', function ($scope, $state) {
    $scope.sectionClass = '';

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sectionClass = $state.current.name;
    });

  });

