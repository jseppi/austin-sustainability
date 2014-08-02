'use strict';

App.factory('SectionService', function ($http, $q, CONTENT_PATH, SECTIONS) {

  var service = {};

  service.getSections = function () {
    var promises = _.map(SECTIONS, function (section) {
      var path = CONTENT_PATH + section + ".yml";
      return $http.get(path, {cache: true})
        .then(function (response) {
          var sectionConfig = response.data;
          return {
            key: section,
            config: jsyaml.load(sectionConfig)
          };
        });
    });

    return $q.all(promises);
  };

  return service;
});