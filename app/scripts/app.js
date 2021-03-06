(function () {
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

      // Look up $location and $locationProvider and hashbang information to
      // get rid of 'index.html#!' part of url
      //
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
          controller: 'MainController'
        })
        .when('/search', {
          templateUrl: 'views/search.html',
          controller: 'SearchController'
        })
        .when('/newbel', {
          templateUrl: 'views/bel-edit.html',
          controller: 'NewEvidenceController'
        })
        .when('/help', {
          templateUrl: 'views/help.html',
          controller: 'HelpController'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutController'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactController'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
}());
