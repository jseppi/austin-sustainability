'use strict';

App.directive('starMainNav', function () {
    return {
      restrict: 'A',
      template: "<div>MAIN NAV DIRECTIVE</div>",
      link: function (scope, element, attrs) {
        console.log('in main nav');
      }
    };

});