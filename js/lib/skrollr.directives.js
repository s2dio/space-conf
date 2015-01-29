'use strict';

angular.module('directives.skrollr', [])
  .directive('skrollr', function() {
      return {
      link: function(scope, element, attrs) {
        skrollr.init({
            easing: {
                sin: function(p) {
                    return (Math.sin(p * Math.PI * 2 ) + 1) / 2;
                },
                cos: function(p) {
                    return (Math.cos(p * Math.PI * 2 ) + 1) / 2;
                }
            },

          forceHeight: false,

          render: function(data) {

              //$("html, body").scrollTop(data.maxTop);

            //Debugging - Log the current scroll position.
            console.log(data.curTop);
          }
        });
      }
    };
  });
