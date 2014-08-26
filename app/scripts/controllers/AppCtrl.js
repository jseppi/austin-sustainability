'use strict';

App
  .controller('AppCtrl', function ($scope, $state) {
    $scope.sectionClass = 'home';

    $scope.isNodeWebkit = (typeof process === "object") && process.versions['node-webkit'];

    if ($scope.isNodeWebkit) {
      var gui = require('nw.gui');
      var win = gui.Window.get();
      win.zoomLevel = win.width / 1000;
    }

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
