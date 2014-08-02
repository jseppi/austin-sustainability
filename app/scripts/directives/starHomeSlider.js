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
          "<div ng-repeat='slide in slides' ng-show='slide.isActive'>" +
            "<p star-markdown='slide.content'></p>" +
            "<img ng-src='{{slide.image}}'/>" +
          "</div>" +
        "</div>",
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
  });