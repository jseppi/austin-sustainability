'use strict';

App.directive('starSeptagram', function () {
    return {
      restrict: 'A',
      template: '<div><img src="http://placehold.it/500x500" /></div>',
      link: function (scope, element, attrs) {
        console.log('in septagram');
      }
    };

});