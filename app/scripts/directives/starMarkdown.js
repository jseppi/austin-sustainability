'use strict';

//requires marked lib and ngSanitize 

//specify markdown content as
//  as scope variable <div star-markdown="someScopeVar"></div>
//  as filename <div star-markdown ng-include="'myfile.md'"></div>
//  or as text content <div star-markdown># Title</div> 
App.
  directive('starMarkdown', function ($sanitize) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        if (attrs.starMarkdown) {
          scope.$watch(attrs.starMarkdown, function (newVal) {
            var html = newVal ? $sanitize(marked(newVal)) : '';
            element.html(html);
          });
        } else {
          var html = $sanitize(marked(element.text()));
          element.html(html);
        }
      }
    };
  });