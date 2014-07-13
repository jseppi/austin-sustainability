'use strict';

App.directive('starSectionNav', function ($state) {
  return {
    restrict: 'A',
    template: '<div class="star-section-nav">' +
              '<ul>' +
                '<li>subsection 1</li>' +
                '<li>subsection 2</li>' +
                '<li>subsection 3</li>' +
                '<li>subsection 4</li>' +
              '</ul>' +
              '</div>',
    link: function (scope) {
      console.log("in section nav", $state.current.data.section);
      return;
    }
  };

});