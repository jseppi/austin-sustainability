'use strict';

App
  .controller('AppCtrl', function ($scope, $state) {
    $scope.sectionClass = 'home';

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sectionClass = $state.current.name;
    });
  });
