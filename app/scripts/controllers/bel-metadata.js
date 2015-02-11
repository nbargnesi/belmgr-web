'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:belMetadataFormController
 * @description
 * # belMetadataFormController
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
    .controller('belMetadataFormController', ['$scope', '$filter', 'modelNewBel', function($scope, $filter, modelNewBel) {

        $scope.reviewStatusSets = [{
            id: 0,
            label: '--Review Status--'
        }, {
            id: 1,
            label: 'Draft'
        }, {
            id: 2,
            label: 'Review'
        }, {
            id: 3,
            label: 'Approved'
        }, {
            id: 4,
            label: 'Rejected'
        }];

        $scope.reviewStatus = $scope.reviewStatusSets[0];

        // ng-change to update the review status value into the service
        $scope.changeReviewStatus = function() {
            modelNewBel.belMetadata.reviewStatus = $scope.reviewStatus.label;
        };

        $scope.author = '';
        // ng-change to update the author value into the service
        $scope.changeAuthor = function() {
            modelNewBel.belMetadata.author = $scope.author;
        };

        $scope.createdDate = '';
        // ng-change to update the createdDate value into the service
        $scope.changeCreatedDate = function() {
            modelNewBel.belMetadata.createdDate = $filter('date')($scope.createdDate, 'yyyy-MM-dd');
        };

        $scope.reviewer = '';
        // ng-change to update the reviewer value into the service
        $scope.changeReviewer = function() {
            modelNewBel.belMetadata.reviewer = $scope.reviewer;
        };

        $scope.reviewedDate = '';
        // ng-change to update the reviewedDate value into the service
        $scope.changeReviewedDate = function() {
            modelNewBel.belMetadata.reviewedDate = $filter('date')($scope.reviewedDate, 'yyyy-MM-dd');
        }

        $scope.belEvidenceSource = '';
        // ng-change to update the bel evidence source value into the service
        $scope.changeBelEvidenceSource = function() {
            modelNewBel.belMetadata.belEvidenceSource = $scope.belEvidenceSource;
        };

    }]);
