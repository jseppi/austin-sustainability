'use strict';

App.factory('SectionService', function ($http, $q, CONTENT_PATH, SECTIONS) {

  var service = {};
  var _isLoaded = false;
  var _data = [];

  service.getSections = function () {
    var deferred = $q.defer();
    if (_isLoaded) {
      deferred.resolve(_data);
    }
    else {

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

      $q.all(promises).then(function (sections) {
        _isLoaded = true;
        _data = sections;
        deferred.resolve(_data);
      });
  
    }
    
    return deferred.promise;
  };

  return service;
});