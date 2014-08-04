'use strict';
App.
  directive('starVisualization', function () {
    return {
      restrict: 'A',
      scope: {
        visualizations: '=starVisualization'
      },
      template: "" + 
        "<div class='visualization-slider'>" +
          "<ul ng-if='visualzations.length' class='vis-controls'>" + 
            "<li ng-repeat='vis in visualizations' ng-class='{active: vis.isActive}'>" +
              "<button type='button' ng-click='makeActive(vis)'>{{$index + 1}}</button>" +
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
            "<img ng-src='{{vis.graphic}}'/>" +
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