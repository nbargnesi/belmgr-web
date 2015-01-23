'use strict';

/**
 * @ngdoc overview
 * @name belmgrWebApp
 * @description
 * # belmgrWebApp
 *
 * Main module of the application.
 */
angular
  .module('belmgrWebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($routeProvider, $locationProvider) {

    // Look up $location and $locationProvider and hashbang information to get rid of 'index.html#!' part of url
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
    $locationProvider
      .html5Mode(false)
      .hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/newbel', {
        templateUrl: 'views/newbel.html',
        controller: 'NewbelCtrl'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
