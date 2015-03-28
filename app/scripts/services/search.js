(function () {
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

    function getEvidenceCollection(setting, cb, additionalFilters) {

      function _success(responseData, statusString, request) {
          cb(responseData.evidence, responseData.facets);
      }

      function _error(request, errorString, exception) {

      }

      var _cb = {
          success: _success,
          error: _error
      };
      //var FilterOptions = new belhop.__.FilterOptions('metadata', 'status', 'Draft');
      
      var searchOptions = new belhop.__.SearchOptions(setting.start, setting.size, setting.facet, setting.filterOptions);
      if (setting.facet === true) {
          belhop.evidence.search(searchOptions, _cb, {
              additionalFilters: additionalFilters
          });
      } else {
          belhop.evidence.search(searchOptions, _cb);
      }
    }
  } // end of searchService
}());
