'use strict';
angular.module('directives.preloader', [])
    .directive('preloader', function () {
        return {
            restrict: 'A',
            compile: function(element, attrs) {
                angular.element(window).bind('load', function() {
                    if (Modernizr.csstransforms) {
                        angular.element('.preloader').hide('slow');
                        element.attr('class', 'loaded');
                    } else {
                        angular.element('.not-support').show();
                    }
                });
            }
        };
    });

