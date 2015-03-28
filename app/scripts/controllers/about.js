(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name belmgrWebApp.controller:AboutController
   * @description
   * # AboutController
   * Controller of the belmgrWebApp
   */
  angular.module('belmgrWebApp')
    .controller('AboutController', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
}());
