(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name belmgrWebApp.controller:HelpController
   * @description
   * # HelpController
   * Controller of the belmgrWebApp
   */
  angular.module('belmgrWebApp')
    .controller('HelpController', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
}());
