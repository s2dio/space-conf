'use strict';
angular.module('directives.preloader', [])
    .directive('preloader', function () {
        return {
            restrict: 'A',
            compile: function() {
                    angular.element('#smoke').hide();
                    angular.element(window).bind('load', function() {
                        if (Modernizr.csstransforms) {

                            if ($(document).scrollTop() == "3790" ) {
                                angular.element('.preloader').hide();
                            }
                            angular.element('#smoke').show();

                        } else {
                            angular.element('.not-support').show();
                        }
                    });
            },
        };
    });

