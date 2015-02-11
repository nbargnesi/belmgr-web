'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:NewbelCtrl
 * @description
 * # NewbelCtrl
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
    .controller('NewbelCtrl', ['$scope', 'modelNewBel', function($scope, modelNewBel) {

        $scope.modelNewBel = '';

        // the model data that will be sent to the server
        $scope.belStatement = modelNewBel.belStatement;
        $scope.belCitation = modelNewBel.belCitation;
        $scope.belAnnotation = modelNewBel.belAnnotation;
        $scope.belMetadata = modelNewBel.belMetadata;

        // status states definition
        $scope.showStatement = true;
        $scope.showCitation = true;
        $scope.showAnnotation = true;
        $scope.showComment = true;

        // ng-click to submit the evidence
        $scope.submitNewBel = function() {
            $scope.modelNewBel = modelNewBel.updateNewBel();
        };

        // ng-click to reset the form
        $scope.reset = function() {
            $scope.newBelForm.$setPristine();
            $scope.modelNewBel = '';
            modelNewBel.resetNewBel();
        };
    }]);
