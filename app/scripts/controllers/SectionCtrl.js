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
