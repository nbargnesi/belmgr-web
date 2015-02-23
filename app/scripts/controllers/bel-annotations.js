'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:belAnnotationFormController
 * @description
 * # belAnnotationFormController
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
    .controller('belAnnotationFormController', ['$scope', '$http', 'modelNewBel', function($scope, $http, modelNewBel) {
        /**
         * @function init
         * @description an ng-init function to update the options calling annotation api from belhop
         */
        $scope.init = function() {

            var onErr = function() {

            };

            var onSucc = function(annotations) {
                $scope.structuredAnnotationTypesList = annotations;
                $scope.structuredAnnotations[0].annotationType = annotations[0].name;
                $scope.$apply();
            };

            var _cb = {
                error: onErr,
                success: onSucc
            };

            belhop.annotations.getTypes(_cb);
        };

        /**
         * @description an ng-model for bel summary text
         * @type {String}
         */
        $scope.belSummaryText = '';

        /**
         * @function changeBelSummary
         * @description an ng-change to update the Bel Summary Text to the service
         */
        $scope.changeBelSummary = function() {
            modelNewBel.belAnnotation.belSummaryText = $scope.belSummaryText;
        };

        /**
         * @name structuredAnnotations
         * @description the default object structure for structured annotations
         * @type {Array}
         */
        $scope.structuredAnnotations = [{
            annotationType: '',
            annotation: ''
        }];

        /**
         * @function changeStructuredAnnotationType
         * @description ng-change to update the value into service
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.changeStructuredAnnotationType = function(index) {
            modelNewBel.belAnnotation.structuredAnnotations[index].annotationType = $scope.structuredAnnotations[index].annotationType;
        };

        /**
         * @function changeStructuredAnnotation
         * @description ng-change to update the structrue annotation value to the service
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.changeStructuredAnnotation = function(index) {
            modelNewBel.belAnnotation.structuredAnnotations[index].annotation = $scope.structuredAnnotations[index].annotation;
        };

        /**
         * @function addStructuredAnnotation
         * @description ng-click to add a new structured annotation group
         */
        $scope.addStructuredAnnotation = function() {
            modelNewBel.belAnnotation.structuredAnnotations.push({
                annotationType: $scope.structuredAnnotationTypesList[0].name,
                annotation: ''
            });
            $scope.structuredAnnotations.push({
                annotationType: $scope.structuredAnnotationTypesList[0].name,
                annotation: ''
            });
        };

        /**
         * @function removeStructuredAnnotation
         * @description ng-click to remove a new structured annotation group
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.removeStructuredAnnotation = function(index) {
            modelNewBel.belAnnotation.structuredAnnotations.splice(index, 1);
            $scope.structuredAnnotations.splice(index, 1);
        };
        /**
         * @function structuredAnnotationBlur
         * @description ng-blur function to add new entry of structured annotation
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.structuredAnnotationBlur = function(index) {
            if ($scope.structuredAnnotations[index].annotation.length !== 0 && !$scope.structuredAnnotations[index + 1]) {
                $scope.addStructuredAnnotation(index);
                $scope.focusOnType = 'structured';
                $scope.focusOn = index + 1;
            }
        };

        /**
         * @name freeAnnotations
         * @description the default object structure for free annotations
         * @type {Array}
         */
        $scope.freeAnnotations = [{
            annotationType: '',
            annotation: ''
        }];

        /**
         * @function changeFreeAnnotationType
         * @description ng-change to update the value into service
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.changeFreeAnnotationType = function(index) {
            modelNewBel.belAnnotation.freeAnnotations[index].annotationType = $scope.freeAnnotations[index].annotationType;
        };

        /**
         * @function changeFreeAnnotation
         * @description ng-change to update the free annotation value to the service
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.changeFreeAnnotation = function(index) {
            modelNewBel.belAnnotation.freeAnnotations[index].annotation = $scope.freeAnnotations[index].annotation;
        };
        /**
         * @function addFreeAnnotation
         * @description ng-click to add a new free annotation group
         */
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

        /**
         * @function removeFreeAnnotation
         * @description ng-click to remove a new free annotation group
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.removeFreeAnnotation = function(index) {
            modelNewBel.belAnnotation.freeAnnotations.splice(index, 1);
            $scope.freeAnnotations.splice(index, 1);
        };
        /**
         * @function freeAnnotationBlur
         * @description ng-blur function to add new entry of free annotation
         * @param  {number} index value from ng-repeat's $index to identify the target model
         */
        $scope.freeAnnotationBlur = function(index) {
            if ($scope.freeAnnotations[index].annotation.length !== 0 && !$scope.freeAnnotations[index + 1]) {
                $scope.addFreeAnnotation(index);
                $scope.focusOnType = 'free';
                $scope.focusOn = index + 1;
            }
        };

    }]);
