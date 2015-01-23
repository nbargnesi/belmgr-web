'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
  .controller('SearchCtrl', function ($scope, search) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
