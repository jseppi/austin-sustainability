'use strict';

App.controller('HomeCtrl', function ($scope, $state, sections) {

  $scope.sections = sections;

  // $scope.section = $state.current.data.section; 

  // //Path to content file for the currently selected section
  // var contentFilePath = CONTENT_PATH + $scope.section.slug + ".yml";
  
  // $http.get(contentFilePath, {cache: $templateCache})
  //   .success(function (response) {
  //     var sectionContent = jsyaml.load(response);

  //     $scope.sectionLead = sectionContent.lead;
  //     $scope.subsections = sectionContent.subsections;

  //     //default to selecting the first subsection 
  //     $scope.selectedSubsection = _.first($scope.subsections);
  //   });


  // $scope.selectSubsection = function (ss) {
  //   $scope.selectedSubsection = ss;
  // };

});
