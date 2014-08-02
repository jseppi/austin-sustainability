'use strict';

App.factory('HomeService', function ($http, $q, CONTENT_PATH) {

  var service = {};

  service.getContent = function () {

    var path = CONTENT_PATH + 'home.yml';
    return $http.get(path, {cache: true})
      .then(function (response) {
        var homeConfig = response.data;
        return jsyaml.load(homeConfig)
      });
  };

  return service;
});