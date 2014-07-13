'use strict';


function parseSectionsOrig (text) {
  var sections = [], section;
  function add () {
    if(section) {
      sections.push(section.join('\n'));   
    }
  }
  _.each(text.split('\n'), function (line) {
    if(/^\s*#/.test(line)) { // new section
      add();
      section = [];
    }
    (section = section || []).push(line);
  });

  //add the last section
  add();

  return sections;
}

function parseSections (text) {
  var sections = [];

  var lines = text.split('\n');

  _.each(lines, function (line) {
    if (/^\s*#/.test(line)) { //new section
      sections.push({
        line: line
      });
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
        console.log(response);
        console.log(parseSections(response));
        
      });
  });

