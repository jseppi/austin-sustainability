'use strict';

App
  .controller('AppCtrl', function ($scope, $state) {
    $scope.sectionClass = 'home';

    $scope.closeKiosk = function () {
      if (!$scope.isNodeWebkit) { 
        return; 
      }
      var gui = require('nw.gui');
      gui.App.quit();
    };

    $scope.$on('$stateChangeSuccess', function () {
      $scope.sectionClass = $state.current.name;
    });
  });
