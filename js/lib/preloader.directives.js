'use strict';
angular.module('directives.preloader', [])
    .directive('preloader', function () {
        return {
            restrict: 'A',
            compile: function(element, attrs) {
                angular.element(window).bind('load', function() {
                    setTimeout(function() {
                        $('.navbar-begin').click();
                    }, 1000);

                    var b = document.body.style;
                    if(b.MozTransition=='' || b.WebkitTransition=='' || b.OTransition=='' || b.transition=='') {
                        //$(window).scrollTop(9000);
                        setTimeout(function() {
                            $('.navbar-begin').click();
                        }, 1000);
                        setTimeout(function() {
                            angular.element('.preloader').hide();
                        }, 2000);
                        element.attr('class', 'loaded');
                    } else {
                        angular.element('.not-support').show();
                    }
                });
            }
        };
    });

