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
          return SectionService.getSections();
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
            return SectionService.getSections();
          }
        }
      });
      return;
    });
    
    $urlRouterProvider.otherwise('/');
    return;
});

App.run(function (SectionService) {
  console.log('loading sections')
  SectionService.getSections();
});

'use strict';

App.factory('SectionService', function ($http, $q, CONTENT_PATH, SECTIONS) {

  var service = {};
  var _isLoaded = false;
  var _data = [];

  service.getSections = function () {
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
  .constant('HOME_STAR', 'content/stars/home/identity_05_main-menu-08.png')
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

App.controller('HomeCtrl',
  function ($scope, $state, HOME_STAR, sections) {

    $scope.sections = sections;
    $scope.expandedSection = null;
    $scope.starPath = HOME_STAR;
    
    $scope.expandSection = function (section) {
      if ($scope.expandedSection === section) {
        $scope.expandedSection = null;
        $scope.starPath = HOME_STAR;
      }
      else {
        $scope.expandedSection = section;
        $scope.starPath = section.config.star;
      }
    };

  }
);

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

;