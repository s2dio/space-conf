'use strict';

var slideApp =    [
	{ id: 5, name: 'begin', bg: 'images/begin/main-bg.jpg', objectImg : [{name :'images/begin/objects/mouse.png', w : 0, h : 0, spt: 20, spl: 30}, {name  :'images/begin/objects/time.png', w : 0, h : 0, spt: 20, spl: 30}], url: 'pages/home.html'},
	{ id: 4, name: 'proposes', bg: 'images/proposes/sky-proposes.png', objectImg : [{name : 'images/proposes/objects/browser.png', w : 58, h : 40, spt: 20, spl: 30},{name : 'images/proposes/objects/web.png', w : 137, h : 88, spt: 120, spl: 230}], url: 'pages/proposes.html'},
	{ id: 3, name: 'opotunities', bg: 'images/opotunities/sky-opotunities.png', objectImg : [],   url: 'pages/opotunities.html'},
	{ id: 2, name: 'project', bg: 'images/final/sky-final.png', objectImg : [],  url: 'pages/project.html'},
	{ id: 1, name: 'contact', bg: 'images/contacts/sky-contacts.png', objectImg : [],  url: 'pages/contact.html'}
];



// create the module and name it spaceApp
	var spaceApp = angular.module('spaceApp', ['ngRoute', 'directives.winsize', 'directives.skrollr', 'directives.preloader']);

// create the controller and inject Angular's $scope
	spaceApp.controller('beginController', function($scope) {
		$scope.message = 'Confige me';
		$scope.logo = 'Master Site';
	});


	spaceApp.controller('proposesController', function($scope) {

	});


	spaceApp.controller('opotunitiesController', function($scope) {

	});


	spaceApp.controller('projectController', function($scope) {

	});


	spaceApp.controller('contactController', function($scope) {


		var formData = {
			fullname: "default",
			emailaddress: "default",
			textareacontent: "default"
		};

		$scope.save = function() {
			formData = $scope.form;
		};

		$scope.submitForm = function() {
			formData = $scope.form;
			//$http.post('form.php', JSON.stringify(formData)).success(function(){
			//
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
