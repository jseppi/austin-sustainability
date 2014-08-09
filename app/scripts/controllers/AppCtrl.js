'use strict';

App
  .controller('AppCtrl', function ($scope, $state) {
    $scope.sectionClass = 'home';

    $scope.isNodeWebkit = (typeof process === "object") && process.versions['node-webkit'];

    $scope.closeKiosk = function () {
      var gui = require('nw.gui');
      gui.App.quit();
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sectionClass = $state.current.name;
    });
  });
