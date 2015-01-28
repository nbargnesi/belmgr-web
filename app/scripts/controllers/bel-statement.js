'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:NewbelCtrl
 * @description
 * # NewbelCtrl
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
  .controller('NewbelCtrl', function ($scope) {

    $scope.relations = [
        { label: 'increases', value: "increases" },
        { label: 'decreases', value: "decreases" },
        { label: 'directlyIncreases', value: "directlyIncreases" },
        { label: 'directlyDecreases', value: "directlyDecreases" }
    ];

    $scope.citation_types = [
        { label: 'PubmedID', value: "pubmedid" },
        { label: 'Journal', value: "journal" },
        { label: 'Online Resource', value: "onlineresource" },
        { label: 'Other', value: "other" }
    ];

    $scope.annotation_types = [
        { label: 'Anatomy', value: "anatomy" },
        { label: 'Cell Line', value: "cell-line" },
        { label: 'Cell Structure', value: "cell-structure" },
        { label: 'Cell', value: "cell" },
        { label: 'Disease', value: "disease" },
        { label: 'Mesh Anatomy', value: "mesh-anatomy" },
        { label: 'Mesh Diseases', value: "mesh-diseases" },
        { label: 'Species', value: "species-taxonomy-id" }
    ];
  });


