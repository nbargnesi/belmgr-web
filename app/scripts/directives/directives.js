'use strict';

angular.module('belmgrWebApp')
    .directive('bsActiveLink', ['$location', function($location) {
        return {
            restrict: 'A', //use as attribute
            replace: false,
            link: function(scope, elem) {
                //after the route has changed
                scope.$on('$routeChangeSuccess', function() {
                    var hrefs = ['/#' + $location.path(),
                        '#' + $location.path(), //html5: false
                        $location.path()
                    ]; //html5: true
                    angular.forEach(elem.find('a'), function(a) {
                        a = angular.element(a);
                        if (-1 !== hrefs.indexOf(a.attr('href'))) {
                            a.parent().addClass('active');
                        } else {
                            a.parent().removeClass('active');
                        }
                    });
                });
            }
        };
    }]);

// <div my-facet my-facet-title="Test Facet" my-facet-data="facet-data"></div>
angular.module('belmgrWebApp')
    .directive('myFacet', function() {
        return {
            restrict: 'A', // use as an attribute
            replace: true,
            templateUrl: 'views/search-facet-tpl.html',
            scope: {
                myFacetTitle: '@',
                myFacetData: '@'
            },
            controller: function($scope) {

            }

        };
    });


// <input focus-index="{{$index}}" />
angular.module('belmgrWebApp')
    .directive('focusIndex', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(function() {
                    return scope.focusOn;
                }, function(newVal) {
                    if (scope.focusOnType === 'free') {
                        $('input[focus-index="' + newVal + '"]').focus();
                    } else if (scope.focusOnType === 'structured') {
                        $('select.structuredAnnotations[focus-index="' + newVal + '"]').focus();
                    }
                });
            }
        };
    });

angular.module('belmgrWebApp')
    .directive('repeatTypeahead', function($compile) {
        return {
            restrict: 'A',
            controller: 'belAnnotationFormController',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                angular.element(element).typeahead(null, {
                    name: 's-annotation',
                    displayKey: 'value',
                    source: scope.doSourceQuery,
                    templates: {
                        empty: null,
                        suggestion: Handlebars.compile(scope.COMPLETION_TEMPLATE)
                    }
                });

                angular.element(element).on('typeahead:selected', updateModel);
                angular.element(element).on('typeahead:autocompleted', updateModel);

                function updateModel(event, datum, name) {
                    ngModel.$setViewValue(datum.name);
                    ngModel.$render();
                    angular.element(element).typeahead('val', ngModel.$viewValue);
                    $compile(angular.element(element))(scope);
                }
            }
        };
    });
