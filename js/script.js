'use strict';
var autoplay = true;
var slideApp =    [
	{ id: 5, name: 'begin', bg: 'images/begin/main-bg.jpg', url: 'pages/home.html'},
	{ id: 4, name: 'proposes', bg: 'images/proposes/sky-proposes.png', url: 'pages/proposes.html'},
	{ id: 3, name: 'opotunities', bg: 'images/opotunities/sky-opotunities.png',   url: 'pages/opotunities.html'},
	{ id: 2, name: 'project', bg: 'images/final/sky-final.png', url: 'pages/project.html'},
	{ id: 1, name: 'contact', bg: 'images/contacts/sky-contacts.png', url: 'pages/contact.html'}
];

 // create the module and name it spaceApp
	var spaceApp = angular.module('spaceApp', [
		'ngRoute',
        'directives.skrollr',
        'directives.preloader',
		'pascalprecht.translate',
		'ngCookies',
		'ngSanitize',
		'directives.winsize'
	])
      //timer
      .factory('animate', function($window, $rootScope) {
        var requestAnimationFrame = $window.requestAnimationFrame ||
            $window.mozRequestAnimationFrame ||
            $window.msRequestAnimationFrame ||
            $window.webkitRequestAnimationFrame;


        return function(tick) {
            requestAnimationFrame(function() {
                $rootScope.$apply(tick);
            });
        };
    });


spaceApp.controller('spaceController',  function($scope, $rootScope, animate, $window, $document) {
    $scope.templates = slideApp;
    $rootScope.msg = 'Launch';

    autoplay = true;


    //start animate
    $scope.startAnimate = function() {
        $('html, body').animate({
            scrollTop: -$document.height()
        }, 60000);
        autoplay = false;
        $rootScope.msg = 'Stop flight';
    };


    //stop animate
    $scope.stopAnimate = function() {
        $('html, body').stop();
        autoplay = true;
        $rootScope.msg = 'Launch';
        $(this).scrollTop(9000);
    };



    // Auto scroll
    $scope.goStart  = function() {
        //autoplay ? animate($scope.startAnimate) : $scope.stopAnimate;
    if (autoplay) {
        animate($scope.startAnimate);
    } else {
        animate($scope.stopAnimate);
    }
    };

    //function bindEvent(e, eventName, callback) {
    //    if(e.addEventListener) // new browsers
    //        e.addEventListener(eventName, callback, false);
    //    else if(e.attachEvent) // IE
    //        e.attachEvent('on'+ eventName, callback);
    //};
    //
    //bindEvent(document.body, 'scroll', function(e) {
    //    document.body.scrollLeft = 0;
    //});
});





spaceApp.controller('beginController',  function($scope) {
	$scope.message = 'Get Started Now  ';
	$scope.logo = 'Website Launcher';
	$scope.header = 'Your Website is <br/> in Your Hands';
	$scope.description = 'You`re 3 steps away <br>from a great website.<br><br> ';
});


spaceApp.controller('proposesController', function($scope) {

});


spaceApp.controller('opotunitiesController', function($scope) {

});


spaceApp.controller('projectController', function($scope) {

});


spaceApp.controller('contactController', function($scope, $http) {
    $scope.formData = {};
    $scope.originForm = angular.copy($scope.contact);


    $scope.submitForm = function() {

        $scope.formData = {
            name: $scope.contact.name,
            email: $scope.contact.email,
            message: $scope.contact.message
        };
        console.log($scope.formData);


        $scope.resetForm = function(){
            $scope.contact.name = '';
            $scope.contact.email = '';
            $scope.contact.message = '';
        };

        $scope.resetForm();

        $http({
            method  : 'POST',
            url     : 'send_email.php',
            data    : $.param($scope.formData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data){
            if (data.success) {
                $scope.success = "success";
                $scope.resetForm();
            } else {
                $scope.success = "error";
            }
        });
    };


});



//include all slides on the one page
spaceApp.controller('slideController',  function($scope, $rootScope, animate, $window, $document) {



});



//menu
spaceApp.controller('menuController',  function($location, $scope, $window, $rootScope) {
	$scope.names = slideApp;
	$scope.accessToken = $window.location.hash.substring(2);
	$scope.selected =  slideApp[0].name;



	//active menu
	$scope.isActive = function(item) {
		return $scope.selected === item;
	};

	//Go to slide
	$scope.goTo = function(name) {
		var scrollPos =  $('#'+name).offset().top;

        if(name == slideApp[0].name) {
            scrollPos = 5000
        }

        if ($location.hash() !== name) {
            $('html, body').stop(true, true).animate({
                scrollTop: scrollPos
            }, 3000, function(){
                // selected item
                $scope.selected = name;
            });
        }
	};


	// Bind to scroll

	angular.element($window).on("scroll", function() {
		// Get container scroll position
		var lastId, cur = [], fromTop = $(this).scrollTop();

        //cur[0] = slideApp[0].name;

		//stop animation
		if($(this).scrollTop() <= 0){
			$('html, body').stop();
            $rootScope.msg = 'Launch';
            autoplay = true;
		}

		//console.log($(this).scrollTop());
		// Get id of current scroll item

		angular.forEach(slideApp, function(value, key) {
			if (  $('#'+value.name).length ==0 ) return;
			var itemTop =  $('#'+value.name).offset().top;
			var h = $(window).height() / 2;
			if (itemTop <= fromTop + h) {
				this.push(value.name);
			}
		}, cur);
		// selected item
		if (cur[0]) {
            $location.path(cur[0], false);
			$scope.selected = cur[0];
		}

		$scope.$apply();
	});

	$scope.$watch('selected', function(obj) {
		console.log( "result: " + $scope.selected );
	}, true);
});

spaceApp.service('skrollrService', ['$document', '$q', '$rootScope', '$window',
	function($document, $q, $rootScope, $window){
		var defer = $q.defer();

		function onScriptLoad() {
			// Load client in the browser
			$rootScope.$apply(function() {
				var s = $window.skrollr.init({
					easing: {
						sin: function(p) {
							return (Math.sin(p * Math.PI * 2 ) + 1) / 2;
						},
						cos: function(p) {
							return (Math.cos(p * Math.PI * 2 ) + 1) / 2;
						}
					},

					forceHeight: false
				});
				defer.resolve(s);
			});
		}

		var scriptTag = $document[0].createElement('script');
		scriptTag.type = 'text/javascript';
		scriptTag.async = true;
		scriptTag.src = 'js/lib/skrollr.min.js';

		scriptTag.onreadystatechange = function () {
			if (this.readyState === 'complete') onScriptLoad();
		};

		scriptTag.onload = onScriptLoad;

		var s = $document[0].getElementsByTagName('body')[0];
		s.appendChild(scriptTag);

		return {
			skrollr: function() { return defer.promise; }
		};

	}
]);