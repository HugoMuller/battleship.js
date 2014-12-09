'use strict';

//Setting up route
angular.module('bs').config(
  function($stateProvider, $urlRouterProvider){
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/index.html'
      });
  }
);

//Setting HTML5 Location Mode
angular.module('bs').config(
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  });

/*Setting custom interpolate,
to differentiate angular templates (front end) from swig templates (back end)*/
angular.module('bs').config(
  function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  });
