'use strict';
angular.module('directives.preloader', [])
    .directive('preloader', function () {
        return {
            restrict: 'A',
            compile: function(element, attrs) {
                angular.element(window).bind('load', function() {

                    $("html, body").scrollTop(9000);

                    var b = document.body.style;
                    if(b.MozTransition=='' || b.WebkitTransition=='' || b.OTransition=='' || b.transition=='') {
                        angular.element('.preloader').hide();
                        element.attr('class', 'loaded');
                    } else {
                        angular.element('.not-support').show();
                    }
                });
            }
        };
    });

