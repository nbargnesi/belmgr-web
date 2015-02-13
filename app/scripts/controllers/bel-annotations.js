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
        $scope.changeBelSummary = function() {
            modelNewBel.belAnnotation.belSummaryText = $scope.belSummaryText;
        };

        // list of structured annotation types
        $scope.structuredAnnotationTypesList = [{
            id: 0,
            label: 'Structured Annotations Type 1'
        }, {
            id: 1,
            label: 'Structured Annotations Type 2'
        }];

        $scope.structuredAnnotations = [{
            annotationType: $scope.structuredAnnotationTypesList[0],
            annotation: ''
        }];

        // set up default values for annotation type in the service also in the model
        modelNewBel.belAnnotation.structuredAnnotations[0].annotationType = $scope.structuredAnnotationTypesList[0].label;
        $scope.structuredAnnotationType = $scope.structuredAnnotationTypesList[0];

        // ng-change to update the value into service
        $scope.changeStructuredAnnotationType = function(index) {
            modelNewBel.belAnnotation.structuredAnnotations[index].annotationType = $scope.structuredAnnotations[index].annotationType.label;
        };

        // ng-change to update the structrue annotation value to the service
        $scope.changeStructuredAnnotation = function(index) {
            modelNewBel.belAnnotation.structuredAnnotations[index].annotation = $scope.structuredAnnotations[index].annotation;
        };

        // ng-click to add a new structured annotation group
        $scope.addStructuredAnnotation = function() {
            modelNewBel.belAnnotation.structuredAnnotations.push({
                annotationType: $scope.structuredAnnotationTypesList[0].label,
                annotation: ''
            });
            $scope.structuredAnnotations.push({
                annotationType: $scope.structuredAnnotationTypesList[0],
                annotation: ''
            });
        };

        // ng-click to remove a new structured annotation group
        $scope.removeStructuredAnnotation = function(index) {
            modelNewBel.belAnnotation.structuredAnnotations.splice(index, 1);
            $scope.structuredAnnotations.splice(index, 1);
        };

        $scope.structuredAnnotationBlur = function(index) {
            if ($scope.structuredAnnotations[index].annotation.length !== 0 && !$scope.structuredAnnotations[index + 1]) {
                $scope.addStructuredAnnotation(index);
                $scope.focusOnType = 'structured';
                $scope.focusOn = index + 1;
            }
        };

        $scope.freeAnnotations = [{
            annotationType: '',
            annotation: ''
        }];

        // ng-change to update the value into service
        $scope.changeFreeAnnotationType = function(index) {
            modelNewBel.belAnnotation.freeAnnotations[index].annotationType = $scope.freeAnnotations[index].annotationType;
        };

        // ng-change to update the free annotation value to the service
        $scope.changeFreeAnnotation = function(index) {
            modelNewBel.belAnnotation.freeAnnotations[index].annotation = $scope.freeAnnotations[index].annotation;
        };

        // ng-click to add a new free annotation group
        $scope.addFreeAnnotation = function() {
            modelNewBel.belAnnotation.freeAnnotations.push({
                annotationType: '',
                annotation: ''
            });
            $scope.freeAnnotations.push({
                annotationType: '',
                annotation: ''
            });
        };

        // ng-click to remove a new free annotation group
        $scope.removeFreeAnnotation = function(index) {
            modelNewBel.belAnnotation.freeAnnotations.splice(index, 1);
            $scope.freeAnnotations.splice(index, 1);
        };

        $scope.freeAnnotationBlur = function(index) {
            if ($scope.freeAnnotations[index].annotation.length !== 0 && !$scope.freeAnnotations[index + 1]) {
                $scope.addFreeAnnotation(index);
                $scope.focusOnType = 'free';
                $scope.focusOn = index + 1;
            }
        };

    }]);
