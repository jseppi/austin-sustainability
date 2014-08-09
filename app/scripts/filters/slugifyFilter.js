'use strict';

App.filter('slugify', function() {

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '_')           // Replace spaces with _
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '_')         // Replace multiple _ with single _
      .replace(/^_+/, '')             // Trim _ from start of text
      .replace(/_+$/, '');            // Trim _ from end of text
  }

  return function(input) {
    return input && _.isString(input) ? slugify(input) : ''; 
  };

});