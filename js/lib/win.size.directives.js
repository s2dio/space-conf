 'use strict'; 
 angular.module('directives.winsize', [])
     .directive('winsize', function() {
         return {
             link: function(scope, element, attrs) {
                var $win = $(window);
                 $("html, body").scrollTop(element.last().offset().top);
                 element.height($win.height());
                 $win.resize(function(){
                     element.height($win.height());
                 });
             }
         };
     });
