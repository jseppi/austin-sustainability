'use strict';


function parseSections (text) {
  var sections = [];
  var lines = text.split('\n');
  var headingRegex = /^\s*(#+)\s(.*)/;

  _.each(lines, function (line) {
    if (angular.isString(line)) {
      var match = line.match(headingRegex);
      if (match) {
        sections.push({
          level: match[1].length,
          heading: match[2]
        });
      }
    }
  });

  return sections;  
}

App
  .controller('SectionCtrl', function ($scope, $http, $templateCache, $state, CONTENT_PATH) {
    $scope.section = $state.current.data.section; 

    //Path to content file for the currently selected section
    var contentFilePath = CONTENT_PATH + $scope.section.slug + ".md";
  
    $http.get(contentFilePath, {cache: $templateCache})
      .success(function (response) {
        console.log(parseSections(response));
      });
  });

