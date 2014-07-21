'use strict';

/* jshint -W079: false */
var App = angular.module('app', [
  'ngAnimate', 'ngSanitize', 'ngTouch', 'ui.router'
]);


App.config(function ($stateProvider, $urlRouterProvider, SECTIONS) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      resolve: {
        sections: function (SectionService) {
          return SectionService.load();
        }
      }
    });


    //Create state for each main section based on slugs
    _.each(SECTIONS, function (section) {
      $stateProvider.state(section, {
        url: '/' + section,
        templateUrl: 'partials/section.html',
        controller: 'SectionCtrl',
        resolve: {
          sections: function (SectionService) {
            return SectionService.load();
          }
        }
      });
      return;
    });
    
    $urlRouterProvider.otherwise('/');
    return;
});

'use strict';

App.factory('SectionService', function ($http, $q, CONTENT_PATH, SECTIONS) {

  var service = {};
  var _isLoaded = false;
  var _data = [];

  service.load = function () {
    var deferred = $q.defer();
    if (_isLoaded) {
      deferred.resolve(_data);
    }
    else {

      var promises = _.map(SECTIONS, function (section) {
        var path = CONTENT_PATH + section + ".yml";
        return $http.get(path, {cache: true})
          .then(function (response) {
            var sectionConfig = response.data;
            return {
              key: section,
              config: jsyaml.load(sectionConfig)
            };
          });
      });

      $q.all(promises).then(function (sections) {
        _isLoaded = true;
        _data = sections;
        deferred.resolve(_data);
      });
  
    }
    
    return deferred.promise;
  };

  return service;
});
App
  .constant('CONTENT_PATH', 'content/')
  .constant('SECTIONS', [
    'climate_and_energy',
    'natural_systems',
    'equity_and_empowerment',
    'health_and_safety',
    'arts_education_and_culture',
    'economy_and_jobs',
    'built_environment',
  ])
  ;
'use strict';

App
  .controller('AppCtrl', function ($scope, $state) {
    $scope.sectionClass = '';

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sectionClass = $state.current.name;
    });

  });


'use strict';

App.controller('HomeCtrl', function ($scope, $state, sections) {

  $scope.sections = sections;

});

'use strict';

App.controller('SectionCtrl', function ($scope, $state, sections) {
  
  var currentSection = _.find(sections, function (s) {
    return s.key === $state.current.name; }
  );

  $scope.section = currentSection.config;
  $scope.subsections = currentSection.config.subsections;

  //default to selecting the first subsection 
  $scope.selectedSubsection = _.first($scope.subsections);


  $scope.selectSubsection = function (ss) {
    $scope.selectedSubsection = ss;
  };

});

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

'use strict';
// Based on btford/angular-markdown-directive
// https://github.com/btford/angular-markdown-directive

// Requires marked and ngSanitize 

// Specify markdown content as
//   as scope variable: <div star-markdown="someScopeVar"></div>
//   as file: <div star-markdown ng-include="'myfile.md'"></div>
//   as html node content <div star-markdown># Title</div> 
App.
  directive('starMarkdown', function ($sanitize) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        if (attrs.starMarkdown) {
          scope.$watch(attrs.starMarkdown, function (newVal) {
            var html = newVal ? $sanitize(marked(newVal)) : '';
            element.html(html);
          });
        } else {
          var html = $sanitize(marked(element.text()));
          element.html(html);
        }
      }
    };
  });
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

;