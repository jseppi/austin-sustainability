'use strict';

App.directive('starMainNav', function () {
  return {
    restrict: 'A',
    scope: {
      sections: '=starMainNav'
    },
    template: '' +
      '<nav class="star-main-nav" role="navigation">' +
        '<ul>' +
          '<li ng-repeat="section in sections" class="{{ section.key }}" ng-class="{\'selected\': selectedSection == section}">' +
            '<h3 class="section-title">' +
              '<a href="" ng-click="showSection(section)">' +
                '{{section.config.title}}' +
              '</a>' +
            '</h3>' +
            '<div class="section-description">' +
              '<p>{{section.config.description}}</p>' +
              '<p class="text-center">' +
                '<a class="btn btn btn-explore" ui-sref="{{section.key}}">' +
                  'Explore' +
                '</a>' +
              '</p>' +
            '</div>' +
          '</li>' +
        '</ul>' +
      '</nav>',
    link: function (scope) {

      scope.selectedSection = null;
      
      scope.showSection = function (section) {
        if (scope.selectedSection === section) {
          scope.selectedSection = null;
        }
        else {
          scope.selectedSection = section;
        }
      };

      return;
    }
  };
});
