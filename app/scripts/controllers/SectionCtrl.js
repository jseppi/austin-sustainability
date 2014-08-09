'use strict';

App.controller('SectionCtrl', function ($scope, $state, $filter, $stateParams, sections) {

  var slugify = $filter('slugify');
  
  var currentSection = _.find(sections, function (s) {
    return s.key === $state.current.name; }
  );

  $scope.section = currentSection.config;
  $scope.subsections = currentSection.config.subsections;


  console.log('$stateParams', $stateParams);

  slugify('james is cool');

  var subsectionParam = $stateParams.subsection;

  if (!subsectionParam) {
    //default to selecting the first subsection 
    $scope.selectedSubsection = _.first($scope.subsections);
  }

  $scope.selectSubsection = function (ss) {
    $scope.selectedSubsection = ss;
  };

});
