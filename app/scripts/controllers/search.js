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
            $scope.searchQuery = '';
            $scope.statusFacet = true;
            // this is the default settings for evidence search
            $scope.evidenceSetting = new evidenceSetting();
            // runs the search with the default settings as the init results
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence);
        };

        // the evidence setting class
        function evidenceSetting() {
            this.start = 0;
            this.size = 100;
            this.facet = $scope.statusFacet;
            this.filterOptions = createFilterOptions();
        }

        function createFilterOptions() {
            var filterOptions = null;
            $scope.additionalFilters = $scope.selectedFacets;
            return filterOptions;
        }

        $scope.getEvidenceCollectionNext = function() {
            var previous = $scope.evidenceSetting.start;
            $scope.evidenceSetting = new evidenceSetting();
            $scope.evidenceSetting.start = previous + 100;
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence, $scope.additionalFilters);
        };

        $scope.getEvidenceCollectionPrev = function() {
            var previous = $scope.evidenceSetting.start;
            $scope.evidenceSetting = new evidenceSetting();
            if (previous >= 100) {
                $scope.evidenceSetting.start = previous - 100;
            } else {
                $scope.evidenceSetting.start = 0
            }
            searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence, $scope.additionalFilters);
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
                content: [],
                filters: ''
            };
            var status = {
                facetGroup: 'Status',
                content: [],
                filters: ''
            };

            // show the facets
            facets.forEach(function(facet) {
                if (facet.filter.category === 'biological_context' && facet.filter.name === "Species") {
                    if (!angular.isArray(facet.filter.value)) {
                        $scope.selectedFacets.forEach(function(item) {
                            if (item.value === facet.filter.value) {
                                facet.selected = true;
                            }
                        });
                        species.content.push(facet);
                    }
                } else if (facet.filter.category === 'metadata' && facet.filter.name === "status") {
                    $scope.selectedFacets.forEach(function(item) {
                        if (item.value === facet.filter.value) {
                            facet.selected = true;
                        }
                    });
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
        };

    } // end of SearchCtrl
