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
