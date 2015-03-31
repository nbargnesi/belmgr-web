(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name belmgrWebApp.controller:SearchController
     * @description
     * # SearchController
     * Controller of the belmgrWebApp
     */

    angular.module('belmgrWebApp')
        .controller('SearchController', searchController);

    searchController.$inject = ['$scope', '$filter', 'searchService'];

    function searchController($scope, $filter, searchService) {

            $scope.init = function() {
                $scope.searchQuery = '';
                $scope.statusFacet = true;
                $scope.currentPosition = 0;
                // this is the default settings for evidence search
                $scope.evidenceSetting = new evidenceSetting();
                // runs the search with the default settings as the init results
                searchService.getEvidenceCollection($scope.evidenceSetting, loadEvidence);
            };

            // the evidence setting class
            function evidenceSetting() {
                this.start = $scope.currentPosition;
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
                $scope.currentPosition = $scope.currentPosition + 100;
                $scope.evidenceSetting = new evidenceSetting();
                searchService.getEvidenceCollection($scope.evidenceSetting, updateResult, $scope.additionalFilters);
            };

            $scope.getEvidenceCollectionPrev = function() {
                if ($scope.currentPosition >= 100) {
                    $scope.currentPosition = $scope.currentPosition - 100;
                } else {
                    $scope.currentPosition = 0
                }
                $scope.evidenceSetting = new evidenceSetting();
                searchService.getEvidenceCollection($scope.evidenceSetting, updateResult, $scope.additionalFilters);
            };

            function updateResult(collection, facets) {
                $scope.evidenceCollection = collection;
                $scope.$digest(['$scope.evidenceCollection', '$scope.facetsSet']);
            }

            function loadEvidence(collection, facets) {
                $scope.evidenceCollection = collection;
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
                            species.content.push(facet);
                        }
                    } else if (facet.filter.category === 'metadata' && facet.filter.name === "status") {

                        if (!angular.isArray(facet.filter.value)) {
                            status.content.push(facet);
                        }
                    }
                });

                $scope.facetsSet.push(species, status);
                $scope.$digest(['$scope.evidenceCollection', '$scope.facetsSet']);
            }

            $scope.selectedFacets = [];
            $scope.displayDetail = [];
            $scope.showDetail = function(id) {
                if ($scope.displayDetail[id] === false || $scope.displayDetail[id] === undefined) {
                    $scope.displayDetail[id] = true;
                } else {
                    $scope.displayDetail[id] = false;
                }

            }
            $scope.facetFilter = function(filterObject, applyFilter) {
                var filter = belhop.factory.options.filter.custom(filterObject.category, filterObject.name, filterObject.value)
                if (applyFilter === true) {
                    $scope.selectedFacets.push(filter);
                    $scope.searchEvidence();
                } else {
                    $scope.selectedFacets.splice($scope.selectedFacets.indexOf(filter), 1);
                    $scope.searchEvidence();
                }
            };

            $scope.searchEvidence = function() {
                // create new search options
                $scope.evidenceSetting = new evidenceSetting();
                searchService.getEvidenceCollection($scope.evidenceSetting, updateResult, $scope.additionalFilters);
            };

        } // end of SearchController
}());
