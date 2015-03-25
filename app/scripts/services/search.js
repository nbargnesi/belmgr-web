'use strict';

/**
 * @ngdoc service
 * @name belmgrWebApp.search
 * @description
 * # search
 * Service in the belmgrWebApp.
 */
angular.module('belmgrWebApp')
    .factory('searchService', searchService);

function searchService() {
        var service = {
            getEvidenceCollection: getEvidenceCollection,
        };
        return service;

        function getEvidenceCollection(setting, cb) {
            
            function _success(responseData, statusString, request) {
            	console.log(request);
                cb(responseData.evidence, responseData.facets);
            }

            function _error(request, errorString, exception) {

            }

            var _cb = {
                success: _success,
                error: _error
            };
            // var FilterOptions = new belhop.__.FilterOptions(100, '', '', '');
            var searchOptions = new belhop.__.SearchOptions(setting.start, setting.size, setting.facet, setting.filterOptions);
            console.log(searchOptions);
            belhop.evidence.search(searchOptions, _cb);
        }
    } // end of searchService
