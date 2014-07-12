'use strict';

App
  .controller('AppCtrl', function ($scope, $state) {
    $scope.sectionClass = '';

    $scope.$on('$stateChangeSuccess', function() {
      if ($state.current.data && $state.current.data.section) {
        //update the bound sectionClass variable to the current slug
        $scope.sectionClass = $state.current.data.section.slug;
      }
      else {
        $scope.sectionClass = '';
      }
    });

  });

