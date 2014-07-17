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
          '<li ng-repeat="section in sections">' +
            '<h3 class="section-title">' +
              '<a href="" ng-click="showSection(section)">' +
                '{{section.config.title}}' +
              '</a>' +
            '</h3>' +
            '<div ng-class="{\'selected\': selectedSection == section}" class="section-description">' +
              '<p>{{section.config.description}}</p>' +
              '<a class="btn btn-default" ui-sref="{{section.key}}">' +
                'Explore' +
              '</a>' +
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
