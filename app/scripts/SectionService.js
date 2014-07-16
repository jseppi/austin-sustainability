'use strict';

App.factory('SectionService', function ($http, $q, CONTENT_PATH, SECTIONS) {

  var service = {};
  var _isLoaded = false;
  var _data = [];

  service.load = function () {
    var deferred = $q.defer();
    if (_isLoaded) {
      deferred.resolve(_data);
    }
    else {

      var promises = _.map(SECTIONS, function (section) {
        var path = CONTENT_PATH + section + ".yml";
        return $http.get(path, {cache: true})
          .success(function (sectionConfig) {
            _data.push({
              key: section,
              config: jsyaml.load(sectionConfig)
            });
          });
      });

      $q.all(promises).then(function () {
        _isLoaded = true;
        deferred.resolve(_data);
      });
  
    }
    
    return deferred.promise;
  };

  return service;
});