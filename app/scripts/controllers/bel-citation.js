(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name belmgrWebApp.controller:BELCitationFormController
   * @description
   * # BELCitationFormController
   * Controller of the belmgrWebApp
   */
  angular.module('belmgrWebApp')
    .controller('BELCitationFormController', ['$scope', '$filter', 'modelNewBel', function($scope, $filter, modelNewBel) {

      // var to be set once the citation type is changed to PubMed
      $scope.selectPubMed = false;

      // function to executed once the citation type is changed
      // if PubMed is selected then disabled the relative fields
      // and let belhop to get the value
      function selectPubMed(citation) {
        if (citation === 'PubMed') {
          $scope.selectPubMed = true;
          // belhop to get the value
        } else {
          $scope.selectPubMed = false;
        }
      }

      // citation types
      $scope.citationTypeList = [{
        id: 0,
        label: '--Citation Type--'
      }, {
        id: 1,
        label: 'Book'
      }, {
        id: 2,
        label: 'PubMed'
      }, {
        id: 3,
        label: 'Journal'
      }, {
        id: 4,
        label: 'Online Resource'
      }, {
        id: 5,
        label: 'Other'
      }];

      $scope.citationType = $scope.citationTypeList[0];

      // ng-change to update the service value of citation type from the dropdown
      $scope.changeCitationType = function() {
        modelNewBel.belCitation.citationType = $scope.citationType.label;
        selectPubMed($scope.citationType.label);
      };

      // ng-model of citation name
      $scope.citationName = '';

      $scope.changeCitationName = function() {
        modelNewBel.belCitation.name = $scope.citationName;
      };

      // ng-model of citation publish date
      $scope.citationPublishDate = new Date();

      $scope.changeCitationPublishDate = function() {
        modelNewBel.belCitation.publishDate = $filter('date')($scope.citationPublishDate, 'yyyy-MM-dd');
      };

      // ng-model of citation Reference
      $scope.citationRef = '';

      $scope.changeCitationRef = function() {
        modelNewBel.belCitation.reference = $scope.citationRef;
      };

      // ng-model of citation authors
      $scope.citationAuthors = '';

      $scope.changeCitationAuthors = function() {
        modelNewBel.belCitation.authors = $scope.citationAuthors;
      };

      // ng-model of citation comments
      $scope.citationComments = '';

      $scope.changeCitationComments = function() {
        modelNewBel.belCitation.comments = $scope.citationComments;
      };

    }]);
}());
