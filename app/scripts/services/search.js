'use strict';

/**
 * @ngdoc service
 * @name belmgrWebApp.search
 * @description
 * # search
 * Service in the belmgrWebApp.
 */
angular.module('belmgrWebApp')
  .service('search', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var run_search = function(query, offset) {

        return {
            'results': []
        };
    };
  });
