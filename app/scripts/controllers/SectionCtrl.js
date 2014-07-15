'use strict';

App
  .controller('SectionCtrl', function ($scope, $http, $templateCache, $state, CONTENT_PATH) {
    $scope.section = $state.current.data.section; 

    //Path to content file for the currently selected section
    var contentFilePath = CONTENT_PATH + $scope.section.slug + ".yml";
    $http.get(contentFilePath, {cache: $templateCache})
      .success(function (response) {
        var sectionContent = jsyaml.load(response);

        $scope.sectionLead = sectionContent.lead;
        $scope.subsections = sectionContent.subsections;

        $scope.selectedSubsection = _.first($scope.subsections);
      });


    $scope.selectSubsection = function (ss) {
      $scope.selectedSubsection = ss;
    };

  });
