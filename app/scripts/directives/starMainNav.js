'use strict';

App.directive('starMainNav', function () {

    var sections = [
      {
        display: 'Climate and Energy',
        description: 'A sustainable community includes the impacts caused by climate change and increases energy efficiency.'
      },
      {
        display: 'Natural Systems',
        description: 'A sustainable community protects and restores the resources upon which life depends.'
      },
      {
        display: 'Equity and Empowerment',
        description: 'A sustainable community works toward equity and inclusion for all residents.'
      },
      {
        display: 'Health and Safety',
        description: 'Section description text' //TODO: was not specified
      },
      {
        display: 'Arts, Education, and Culture',
        description: 'A sustainable community supports vibrant, connected, and diverse cultures.'
      },
      {
        display: 'Economy and Jobs',
        description: 'A sustainable community provides access to quality jobs and shared prosperity for all.'
      },
      {
        display: 'Built Environment',
        description: 'A sustainable community provides quality, choice, and access in the built environment, where people live, work, and play.'
      }
    ];

    return {
      restrict: 'A',
      template: '<div class="star-main-nav">' +
                '<ul>' +
                  '<li ng-repeat="section in sections">' +
                    '<h3 class="section-title">' +
                      '<a href="" ng-click="showSection(section)">' +
                        '{{section.display}}' +
                      '</a>' +
                    '</h3>' +
                    '<div ng-show="selectedSection == section" class="section-description dn-lightspeed">' +
                      '<p>{{section.description}}</p>' +
                      '<button class="btn btn-default">Explore</button>' +
                    '</div>' +
                  '</li>' +
                '</ul>' +
                '</div>',
      link: function (scope) {
        scope.sections = sections;
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