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
          "<div star-markdown='slide.content'></div>" +
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