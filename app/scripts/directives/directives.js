angular.module('belmgrWebApp')
    .directive('bsActiveLink', ['$location', function ($location) {
    return {
        restrict: 'A', //use as attribute
        replace: false,
        link: function (scope, elem) {
            //after the route has changed
            scope.$on("$routeChangeSuccess", function () {
                var hrefs = ['/#' + $location.path(),
                             '#' + $location.path(), //html5: false
                             $location.path()]; //html5: true
                angular.forEach(elem.find('a'), function (a) {
                    a = angular.element(a);
                    if (-1 !== hrefs.indexOf(a.attr('href'))) {
                        a.parent().addClass('active');
                    } else {
                        a.parent().removeClass('active');
                    };
                });
            });
        }
    }
}]);

// <div my-facet my-facet-title="Test Facet" my-facet-data="facet-data"></div>
angular.module('belmgrWebApp')
    .directive('myFacet', function () {
        return {
            restrict: 'A', // use as an attribute
            replace: true,
            templateUrl: 'views/search-facet-tpl.html',
            scope: {
                myFacetTitle: "@",
                myFacetData: "@"
            },
            controller: function ($scope) {

            }

        }
});

