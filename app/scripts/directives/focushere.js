'use strict';

angular.module('didiApp')
  .directive('focusHere', function($timeout) {
    return {
      scope: { trigger: '@focusHere' },
      link: function(scope, element) {
        scope.$watch('trigger', function(value) {
          if(value === "true") { 
            $timeout(function() {
              element[0].focus(); 
            });
          }
        });
      }
    };
  });
