'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:belCitationFormController
 * @description
 * # belCitationFormController
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
    .controller('belCitationFormController', ['$scope', '$filter', 'modelNewBel', function($scope, $filter, modelNewBel) {

        // citation types
        $scope.citationTypeList = [{
            id: 0,
            label: '--Citation Type--'
        }, {
            id: 1,
            label: 'Citation Type 1'
        }, {
            id: 2,
            label: 'Citation Type 2'
        }, {
            id: 3,
            label: 'Citation Type 3'
        }, {
            id: 4,
            label: 'Citation Type 4'
        }];

        $scope.citationType = $scope.citationTypeList[0];

        // ng-change to update the service value of citation type from the dropdown
        $scope.changeCitationType = function() {
            modelNewBel.belCitation.citationType = $scope.citationType.label;
        };

        // ng-model of citation name
        $scope.citationName = '';

        $scope.changeCitationName = function (){
            modelNewBel.belCitation.name = $scope.citationName;
        };

        // ng-model of citation publish date
        $scope.citationPublishDate = '';

        $scope.changeCitationPublishDate = function (){
            modelNewBel.belCitation.publishDate = $filter('date')($scope.citationPublishDate, 'yyyy-MM-dd');
        };

        // ng-model of citation Reference
        $scope.citationRef = '';

        $scope.changeCitationRef = function (){
            modelNewBel.belCitation.reference = $scope.citationRef;
        };

        // ng-model of citation authors
        $scope.citationAuthors = '';

        $scope.changeCitationAuthors = function (){
            modelNewBel.belCitation.authors = $scope.citationAuthors;
        };

        // ng-model of citation comments
        $scope.citationComments = '';

        $scope.changeCitationComments = function (){
            modelNewBel.belCitation.comments = $scope.citationComments;
        };

    }]);
