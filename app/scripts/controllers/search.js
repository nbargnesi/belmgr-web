'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the belmgrWebApp
 */

angular.module('belmgrWebApp')
    .controller('SearchCtrl', searchCtrl);

searchCtrl.$inject = ['$scope', '$filter', 'searchService'];

function searchCtrl($scope, $filter, searchService) {
        $scope.init = function() {
            $scope.evidenceSetting = {
                start: '0',
                size: '100',
                facet: true,
                filterOptions: null
            };
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence);
        };

        $scope.getEvidenceCollectionNext = function() {
            $scope.evidenceSetting.start = (parseInt($scope.evidenceSetting.start) + 100).toString();
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence);
        };

        $scope.getEvidenceCollectionPrev = function() {
            if (parseInt($scope.evidenceSetting.start) >= 100) {
                $scope.evidenceSetting.start = (parseInt($scope.evidenceSetting.start) - 100).toString();
            }
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence);
        };

        function loadEvidence(collection, facets) {
            $scope.evidenceCollection = collection;
            $scope.evidenceCollection.forEach(function(evidence) {
                evidence.show = true;
            });
            $scope.facetsSet = [];
            facets.forEach(function(facet) {
                if (facet.filter.category === 'biological_context' && facet.filter.name === "Species") {
                    if (angular.isArray(facet.filter.value)) {
                        facet.filter.value = facet.filter.value.toString();
                    }
                    $scope.facetsSet.push(facet);
                } else if (facet.filter.category === 'metadata' && facet.filter.name === "status") {
                    if (angular.isArray(facet.filter.value)) {
                        facet.filter.value = facet.filter.value.toString();
                    }
                    $scope.facetsSet.push(facet);
                }
            });
            console.log($scope.facetsSet);
            $scope.$apply(['$scope.evidenceCollection', '$scope.facetsSet']);
        }

        $scope.selectedFacets = [];

        $scope.facetFilter = function(filterObject, applyFilter) {
            if (applyFilter === true) {
                $scope.selectedFacets.push(filterObject.value);
                $scope.evidenceCollection.forEach(function(evidence) {
                    if (evidence[filterObject.category]) {
                        if (angular.isArray(evidence[filterObject.category])) {
                            evidence[filterObject.category].forEach(function(compare) {

                                if (angular.isArray(compare.value)) {
                                    comapre.value = compare.value.toString();
                                }

                                if (compare.name === filterObject.name && compare.value === filterObject.value) {
                                    evidence.show = true;
                                } else {
                                    evidence.show = false;
                                }
                            });
                        }
                    } else {
                        evidence.show = false;
                    }
                });
            } else {
                $scope.selectedFacets.splice($scope.selectedFacets.indexOf(filterObject.value), 1);
                $scope.evidenceCollection.forEach(function(evidence) {
                    evidence.show = true;
                });
            }
        };
    } // end of SearchCtrl
