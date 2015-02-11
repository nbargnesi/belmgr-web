'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:belAnnotationFormController
 * @description
 * # belAnnotationFormController
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
    .controller('belAnnotationFormController', ['$scope', 'modelNewBel', function($scope, modelNewBel) {

        // ng-model of BEL Summary Text
        $scope.belSummaryText = '';

        // ng-change to update the Bel Summary Text to the service
        $scope.changeBelSummary = function (){
            modelNewBel.belAnnotation.belSummaryText = $scope.belSummaryText;
        };

        // ng-model of structured annotation types
        $scope.structuredAnnotationTypesList = [{
            id: 0,
            label: '--Structured Annotations Type--'
        }, {
            id: 1,
            label: 'Structured Annotations Type 1'
        }, {
            id: 2,
            label: 'Structured Annotations Type 2'
        }];

        $scope.structuredAnnotationType = $scope.structuredAnnotationTypesList[0];

        // ng-change to update the value into service
        $scope.changeStructuredAnnotationType = function() {
            modelNewBel.belAnnotation.structuredAnnotations.annotationTypes = $scope.structuredAnnotationType.label;
        };

        // ng-model of structured annotation
        $scope.structuredAnnotation = '';

        // ng-change to update the structrue annotation value to the service
        $scope.changeStructuredAnnotation = function(){
            modelNewBel.belAnnotation.structuredAnnotations.annotation = $scope.structuredAnnotation;
        };

        // ng-model of free annotation types
        $scope.freeAnnotationTypesList = [{
            id: 0,
            label: '--Free Annotations Type--'
        }, {
            id: 1,
            label: 'Free Annotations Type 1'
        }, {
            id: 2,
            label: 'Free Annotations Type 2'
        }];

        $scope.freeAnnotationType = $scope.freeAnnotationTypesList[0];

        // ng-change to update the value into service
        $scope.changeFreeAnnotationType = function() {
            modelNewBel.belAnnotation.freeAnnotations.annotationTypes = $scope.freeAnnotationType.label;
        };

        // ng-model of free annotation
        $scope.freeAnnotation = '';

        // ng-change to update the free annotation value to the service
        $scope.changeFreeAnnotation = function(){
            modelNewBel.belAnnotation.freeAnnotations.annotation = $scope.freeAnnotation;
        };

    }]);
