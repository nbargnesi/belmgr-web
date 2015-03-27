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
            $scope.statusFacet = true;
            // this is the default settings for evidence search
            $scope.evidenceSetting = new evidenceSetting();
            // runs the search with the default settings as the init results
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence);
        };

        // the evidence setting class
        function evidenceSetting() {
            this.start = '0';
            this.size = '100';
            this.facet = $scope.statusFacet;
            this.filterOptions = createFilterOptions();
        }

        function createFilterOptions() {
            var filterOptions = null;
            $scope.additionalFilters = $scope.selectedFacets;
            return filterOptions;
        }

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

            // this is hard coded
            var species = {
                facetGroup: 'Species',
                content: []
            };
            var status = {
                facetGroup: 'Status',
                content: []
            };

            // show the facets
            facets.forEach(function(facet) {
                if (facet.filter.category === 'biological_context' && facet.filter.name === "Species") {
                    if (!angular.isArray(facet.filter.value)) {
                        species.content.push(facet);
                    }
                } else if (facet.filter.category === 'metadata' && facet.filter.name === "status") {
                    if (!angular.isArray(facet.filter.value)) {
                        status.content.push(facet);
                    }
                }
            });
            $scope.facetsSet.push(species, status);
            $scope.$apply(['$scope.evidenceCollection', '$scope.facetsSet']);
        }

        $scope.selectedFacets = [];

        $scope.facetFilter = function(filterObject, applyFilter) {
            var filter = belhop.factory.options.filter.custom(filterObject.category, filterObject.name, filterObject.value)
            if (applyFilter === true) {
                $scope.selectedFacets.push(filter);
            } else {
                $scope.selectedFacets.splice($scope.selectedFacets.indexOf(filter), 1);
            }
        };

        $scope.searchEvidence = function() {
            // create new search options
            $scope.evidenceSetting = new evidenceSetting();
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence, $scope.additionalFilters);
            $scope.selectedFacets = [];
        };

    } // end of SearchCtrl
