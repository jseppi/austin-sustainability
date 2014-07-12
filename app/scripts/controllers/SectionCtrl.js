'use strict';

App
  .controller('SectionCtrl', function ($scope, $state) {
    $scope.section = $state.current.data.section; 

  });

