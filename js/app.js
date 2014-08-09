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
        home: function (HomeService) {
          return HomeService.getContent();
        },
        sections: function (SectionService) {
          return SectionService.getSections();
        }
      }
    });


    //Create state for each main section based on slugs
    //TODO: subsection routes using slugify() on subsection titles
    _.each(SECTIONS, function (section) {
      $stateProvider.state(section, {
        url: '/' + section + '/:subsection/',
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

App.run(function (SectionService, HomeService) {
  SectionService.getSections();
  HomeService.getContent();
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
    $scope.sectionClass = 'home';

    $scope.$on('$stateChangeSuccess', function () {
      $scope.sectionClass = $state.current.name;
    });
  });

'use strict';

App.controller('HomeCtrl',
  function ($scope, $rootScope, $state, home, sections, HOME_STAR) {

    $rootScope.pageTitle = "Home";

    $scope.homeContent = home;
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

App.controller('SectionCtrl', function ($scope, $rootScope, $state, $filter, $stateParams, sections) {

  function goToDefaultSubsection () {
    $scope.selectedSubsection = _.first($scope.subsections);
    $state.go($state.current.name, {subsection: slugify($scope.selectedSubsection.title)});
  }

  var slugify = $filter('slugify');
  
  var currentSection = _.find(sections, function (s) {
    return s.key === $state.current.name; }
  );

  $scope.sectionName = $state.current.name;
  $scope.section = currentSection.config;
  $scope.subsections = currentSection.config.subsections;

  //get the subsection from the stateParams
  var subsectionParam = $stateParams.subsection;

  if (!subsectionParam || !_.isString(subsectionParam)) {
    //default to selecting the first subsection 
    goToDefaultSubsection();
  }
  else {
    //try to find the matching subsection
    $scope.selectedSubsection = _.find($scope.subsections, function (ss) {
      return subsectionParam.toLowerCase() === slugify(ss.title);
    });

    //if not found, just default to first subsection
    if (!$scope.selectedSubsection) {
      goToDefaultSubsection();
    }
  }

  $rootScope.pageTitle = $scope.section.title + " - " + $scope.selectedSubsection.title;

});

'use strict';
App.
  directive('starHomeSlider', function () {
    return {
      restrict: 'A',
      scope: {
        slides: '=starHomeSlider'
      },
      template: "" + 
        "<div class='home-slider swipable'>" +
          "<ul class='swipe-controls'>" + 
            "<li ng-repeat='slide in slides' ng-class='{active: slide.isActive}'>" +
              "<button type='button' title='Click or swipe to see content' ng-click='makeActive(slide)'>{{$index + 1}}</button>" +
            "</li>" +
          "</ul>" +
          "<div ng-repeat='slide in slides' star-home-slider-content='slide'></div>" +
        "</div>",
      controller: function ($scope) {

        var numSlides = $scope.slides.length;

        this.nextSlide = function (currSlide) {
          var currIndex = _.indexOf($scope.slides, currSlide);
          var nextIndex = (currIndex + 1) % numSlides;
          $scope.slides[currIndex].isActive = false;
          $scope.slides[nextIndex].isActive = true;
        };

        this.prevSlide = function (currSlide) {
          var currIndex = _.indexOf($scope.slides, currSlide);
          var prevIndex = (currIndex - 1 < 0) ? numSlides - 1 : currIndex - 1;
          $scope.slides[currIndex].isActive = false;
          $scope.slides[prevIndex].isActive = true;
        };
      },
      link: function (scope) {
        var firstSlide = _.first(scope.slides);
        firstSlide.isActive = true;

        scope.makeActive = function (slide) {
          var currActive = _.findWhere(scope.slides, {'isActive': true});
          currActive.isActive = false;
          slide.isActive = true;
        };
      }
    };
  })
  .directive('starHomeSliderContent', function () {
    return {
      restrict: 'A',
      replace: true,
      require: '^starHomeSlider',
      scope: {
        slide: '=starHomeSliderContent'
      },
      template: "" +
        "<div ng-swipe-right='swipeRight(slide)' ng-swipe-left='swipeLeft(slide)' class='slide-content' ng-show='slide.isActive'>" +
          "<div star-markdown='slide.content'></div>" +
          "<img ng-src='{{slide.image}}' alt='Image for slide'/>" +
        "</div>",
      link: function (scope, element, attrs, ctrl) {
        scope.swipeRight = function (slide) {
          ctrl.prevSlide(slide);
        };

        scope.swipeLeft = function (slide) {
          ctrl.nextSlide(slide);
        };
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
App.
  directive('starVisualization', function () {
    return {
      restrict: 'A',
      scope: {
        visualizations: '=starVisualization'
      },
      template: "" + 
        "<div class='visualization-slider swipable'>" +
          "<ul ng-if='visualizations.length > 1' class='swipe-controls'>" + 
            "<li ng-repeat='vis in visualizations' ng-class='{active: vis.isActive}'>" +
              "<button type='button' title='Click or swipe to see content' ng-click='makeActive(vis)'>{{$index + 1}}</button>" +
            "</li>" +
          "</ul>" +
          "<div ng-repeat='vis in visualizations' star-visualization-content='vis'></div>" +
        "</div>",
      controller: function ($scope) {

        var numVisualizations = $scope.visualizations.length;

        this.nextVis = function (currVis) {
          var currIndex = _.indexOf($scope.visualizations, currVis);
          var nextIndex = (currIndex + 1) % numVisualizations;
          $scope.visualizations[currIndex].isActive = false;
          $scope.visualizations[nextIndex].isActive = true;
        };

        this.prevVis = function (currVis) {
          var currIndex = _.indexOf($scope.visualizations, currVis);
          var prevIndex = (currIndex - 1 < 0) ? numVisualizations - 1 : currIndex - 1;
          $scope.visualizations[currIndex].isActive = false;
          $scope.visualizations[prevIndex].isActive = true;
        };
      },
      link: function (scope) {
        var firstVis = _.first(scope.visualizations);
        firstVis.isActive = true;

        scope.makeActive = function (vis) {
          var currActive = _.findWhere(scope.visualizations, {'isActive': true});
          currActive.isActive = false;
          vis.isActive = true;
        };
      }
    };
  })
  .directive('starVisualizationContent', function () {
    return {
      restrict: 'A',
      replace: true,
      require: '^starVisualization',
      scope: {
        vis: '=starVisualizationContent'
      },
      template: "" +
        "<div ng-swipe-right='swipeRight(vis)' ng-swipe-left='swipeLeft(vis)' class='vis-container' ng-show='vis.isActive'>" +
          "<h4 class='vis-title' ng-if='vis.title'>{{vis.title}}</h4>" +
          "<div class='vis-description' ng-if='vis.description'>{{vis.description}}</div>" +
          "<div class='vis-graphic-container'>" +
            "<img ng-src='{{vis.graphic}}' alt='Visualization' />" +
          "</div>" +
        "</div>",
      link: function (scope, element, attrs, ctrl) {
        scope.swipeRight = function (vis) {
          ctrl.prevVis(vis);
        };

        scope.swipeLeft = function (vis) {
          ctrl.nextVis(vis);
        };
      }
    };
  });
'use strict';

App.filter('slugify', function() {

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '_')           // Replace spaces with _
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '_')         // Replace multiple _ with single _
      .replace(/^_+/, '')             // Trim _ from start of text
      .replace(/_+$/, '');            // Trim _ from end of text
  }

  return function(input) {
    return input && _.isString(input) ? slugify(input) : ''; 
  };

});
'use strict';

App.factory('HomeService', function ($http, $q, CONTENT_PATH) {

  var service = {};

  service.getContent = function () {

    var path = CONTENT_PATH + 'home.yml';
    return $http.get(path, {cache: true})
      .then(function (response) {
        var homeConfig = response.data;
        return jsyaml.load(homeConfig)
      });
  };

  return service;
});
'use strict';

App.factory('SectionService', function ($http, $q, CONTENT_PATH, SECTIONS) {

  var service = {};

  service.getSections = function () {
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

    return $q.all(promises);
  };

  return service;
});
