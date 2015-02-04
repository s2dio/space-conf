'use strict';

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
		'pascalprecht.translate',
		'ngCookies',
		'ngSanitize',
		'directives.winsize',
		'directives.skrollr',
		'directives.preloader'
	])








spaceApp.controller('beginController',  function($scope) {
	$scope.message = 'Confige me';
	$scope.logo = 'Master Site';
	$scope.header = 'Li Europan lingu <br/> es membres del <br/> sam familie.';
	$scope.description = 'Li Europan lingu <br/> es membres del <br/> sam familie.';
});

spaceApp.controller('proposesController', function($scope) {

});


spaceApp.controller('opotunitiesController', function($scope) {

});


spaceApp.controller('projectController', function($scope) {

});


spaceApp.controller('contactController', function($scope, $http) {
	$scope.formData = {};






	$scope.submitForm = function() {

		 //$http.post('form.php', JSON.stringify(formData)).success(function(){});

		$scope.formData = {
			name: $scope.contact.name,
			email: $scope.contact.email,
			message: $scope.contact.message
		};

		$scope.success = true;

		console.log($scope.formData);
		//$scope.success = "success"
		//$http({
		//	method  : 'POST',
		//	url     : 'contact-form.php',
		//	data    : $.param($scope.formData),
		//	headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		//}).success(function(data){
		//	console.log(data);
		//	if (data.success) {
		//		$scope.success = "success"
		//	} else {
		//		$scope.success = "error"
		//	}
		//});
	};







});



//include all slides on the one page
spaceApp.controller('slideController',  function($scope, $window, $document) {

	$scope.templates = slideApp;
	$scope.msg = 'Automatic start';

	var autoplay = true;
	// Auto scroll
	$scope.goStart  = function() {
		if (autoplay) {
			$window.setTimeout(function () {

				$('html, body').animate({
					scrollTop: -$document.height()
				}, 50000);

				autoplay = false;

				$scope.msg = 'Stop';

			}, 200);

		} else {

			$('html, body').stop();

			autoplay = true;

			$scope.msg = 'Automatic start';
		}
	};

});



//menu
spaceApp.controller('menuController',  function($scope, $window) {
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
		$('html, body').stop(true, true).animate({
			scrollTop: scrollPos
		}, 3000, function(){
			// selected item
			$scope.selected = name;
		});

	}


	// Bind to scroll
	angular.element($window).bind("scroll", function() {
		// Get container scroll position
		var lastId, cur = [], fromTop = $(this).scrollTop();

		//stop animation
		if($(this).scrollTop() < 10){
			$('html, body').stop();
		}

		//console.log($(this).scrollTop());
		// Get id of current scroll item
		angular.forEach(slideApp, function(value, key) {
			if (  $('#'+value.name).length ==0 ) return;
			var itemTop =  $('#'+value.name).offset().top;

			if (itemTop <= fromTop) {
				this.push(value.name);
			}
		}, cur);

		// selected item
		if (cur[0]) {
			$scope.selected = cur[0];
		}

		$scope.$apply();
	});
	//$scope.selected =  slideApp[0].name;
	$scope.$watch('selected', function(obj) {
		console.log( "result: " + $scope.selected );
	}, true);
});