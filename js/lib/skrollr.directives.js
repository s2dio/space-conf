//'use strict';
//angular.module('directives.skrollr', [])
//  .directive('skrollr', function() {
//      return {
//      link: function(scope, element, attrs) {
//        skrollr.init({
//            easing: {
//                sin: function(p) {
//                    return (Math.sin(p * Math.PI * 2 ) + 1) / 2;
//                },
//                cos: function(p) {
//                    return (Math.cos(p * Math.PI * 2 ) + 1) / 2;
//                }
//            },
//
//          forceHeight: false,
//          render: function(data) {
//            //Debugging - Log the current scroll position.
//            //console.log(data.curTop);
//          }
//        });
//      }
//    };
//  });
angular.module('directives.skrollr', [])
    .directive('skrollr', [ 'skrollrService',
        function(skrollrService){
            return {
                link: function(scope, element, attrs){
                    skrollrService.skrollr().then(function(skrollr){
                        skrollr.refresh();
                    });

                    scope.$watch(
                        function () { return element[0].childNodes.length; },
                        function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                skrollrService.skrollr().then(function(skrollr){
                                    skrollr.refresh();
                                });
                            }
                        });
                }
            };
        }
    ]);