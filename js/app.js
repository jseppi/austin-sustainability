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
    $scope.sectionClass = '';

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sectionClass = $state.current.name;
    });

  });


'use strict';

App.controller('HomeCtrl',
  function ($scope, $state, home, sections, HOME_STAR) {

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
App.
  directive('starHomeSlider', function () {
    return {
      restrict: 'A',
      scope: {
        slides: '=starHomeSlider'
      },
      template: "" + 
        "<div class='home-slider'>" +
          "<ul class='slide-controls'>" + 
            "<li ng-repeat='slide in slides' ng-class='{active: slide.isActive}'>" +
              "<button type='button' ng-click='makeActive(slide)'>{{$index + 1}}</button>" +
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
          "<p star-markdown='slide.content'></p>" +
          "<img ng-src='{{slide.image}}'/>" +
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
