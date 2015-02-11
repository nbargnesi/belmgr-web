'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:belStatementFormController
 * @description
 * # belStatementFormController
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
    .controller('belStatementFormController', ['$scope', 'modelNewBel', function($scope, modelNewBel) {
        
        $scope.$watch(function(){
            return $scope.bels.belsource;
        }, function(newValue){
            console.log(newValue);
            modelNewBel.belStatement.source = newValue;
        });

        $scope.$watch(function(){
            return $scope.bels.beltarget;
        }, function(newValue){
            console.log(newValue);
            modelNewBel.belStatement.target = newValue;
        });

        $scope.bels = {
            belsource: '',
            beltarget: ''
        };

        // content and values for the relations dropdown
        $scope.relations = [{
            label: '--Relation--',
            value: ''
        }, {
            label: 'increases',
            value: 'increases'
        }, {
            label: 'decreases',
            value: 'decreases'
        }, {
            label: 'directlyIncreases',
            value: 'directlyIncreases'
        }, {
            label: 'directlyDecreases',
            value: 'directlyDecreases'
        }, {
            label: 'causesNoChange',
            value: 'causesNoChange'
        }, {
            label: 'positiveCorrelation',
            value: 'positiveCorrelation'
        }, {
            label: 'negativeCorrelation',
            value: 'negativeCorrelation'
        }, {
            label: 'translatedTo',
            value: 'translatedTo'
        }, {
            label: 'transcribedTo',
            value: 'transcribedTo'
        }, {
            label: 'isA',
            value: 'isA'
        }, {
            label: 'subProcessOf',
            value: 'subProcessOf'
        }, {
            label: 'rateLimitingStepOf',
            value: 'rateLimitingStepOf'
        }, {
            label: 'biomarkerFor',
            value: 'biomarkerFor'
        }, {
            label: 'prognosticBiomarkerFor',
            value: 'prognosticBiomarkerFor'
        }, {
            label: 'orthologous',
            value: 'orthologous'
        }, {
            label: 'analogous',
            value: 'analogous'
        }, {
            label: 'association',
            value: 'association'
        }, {
            label: 'hasMembers',
            value: 'hasMembers'
        }, {
            label: 'hasComponents',
            value: 'hasComponents'
        }, {
            label: 'hasMember',
            value: 'hasMember'
        }, {
            label: 'hasComponent',
            value: 'hasComponent'
        }, {
            label: 'actsIn',
            value: 'actsIn'
        }, {
            label: 'includes',
            value: 'includes'
        }, {
            label: 'translocates',
            value: 'translocates'
        }, {
            label: 'hasProduct',
            value: 'hasProduct'
        }, {
            label: 'reactantIn',
            value: 'reactantIn'
        }, {
            label: 'hasModification',
            value: 'hasModification'
        }, {
            label: 'hasVariant',
            value: 'hasVariant'
        }];

        $scope.citation_types = [{
            label: 'PubmedID',
            value: 'pubmedid'
        }, {
            label: 'Journal',
            value: 'journal'
        }, {
            label: 'Online Resource',
            value: 'onlineresource'
        }, {
            label: 'Other',
            value: 'other'
        }];

        // Set up the default value for the relations dropdown box
        $scope.belSRelations = $scope.relations[0];

        // ng-change function to update the relation in service
        $scope.changeRelation = function(){
            modelNewBel.belStatement.relation = $scope.belSRelations.label;
        };

        // ng-click functions that take care of the template/search switch
        // will need refactor if using the template later
        $scope.toggleSourceTemplate = function() {
            $('#source-searchbox').hide();
            $('#source-templatebox').toggle();
        };

        $scope.toggleSourceSearch = function() {
            $('#source-templatebox').hide();
            $('#source-searchbox').toggle();
        };

        $scope.toggleTargetTemplate = function() {
            $('#target-searchbox').hide();
            $('#target-templatebox').toggle();
        };

        $scope.toggleTargetSearch = function() {
            $('#target-templatebox').hide();
            $('#target-searchbox').toggle();
        };

        $scope.annotation_types = [{
            label: 'Anatomy',
            value: 'anatomy'
        }, {
            label: 'Cell Line',
            value: 'cell-line'
        }, {
            label: 'Cell Structure',
            value: 'cell-structure'
        }, {
            label: 'Cell',
            value: 'cell'
        }, {
            label: 'Disease',
            value: 'disease'
        }, {
            label: 'Mesh Anatomy',
            value: 'mesh-anatomy'
        }, {
            label: 'Mesh Diseases',
            value: 'mesh-diseases'
        }, {
            label: 'Species',
            value: 'species-taxonomy-id'
        }];

        $scope.COMPLETION_TEMPLATE = '<p>{{value}}</p>';
        $scope.sourceInput = angular.element('#belsource');
        $scope.targetInput = angular.element('#beltarget');

        $scope.selected = function(event, datum, name) {

            var element = null;

            if (name === 'belsource') {
                element = $scope.sourceInput[0];
                $scope.bels.belsource = datum.value;
            } else if (name === 'beltarget') {
                element = $scope.targetInput[0];
                $scope.bels.beltarget = datum.value;
            }
            if (element === null) {
                return;
            } else {
                $scope.$digest();
            }
            var actions = datum.actions;
            var cursorpos = -1;
            function moveCur(action) {
                if (action.move_cursor) {
                    cursorpos = action.move_cursor.position;
                }
            }
            actions.forEach(moveCur);

            if (cursorpos !== -1) {
                element.selectionStart = cursorpos;
                element.selectionEnd = cursorpos;
            }
        };

        $scope.convertCompletions = function(input, completions) {
            var datums = [];
            /* convert completion to datum */
            function addDatum(completion) {

                    var completionType = completion.type;
                    var value = belhop.complete.apply(completion, input);
                    var datum = {
                        value: value,
                        actions: completion.actions
                    };
                    datums.push(datum);
                }
                /* add a datum for each completion */

            // completions.completions is the array that holds the data that 
            // we are going to processs through addDatum function
            completions.completions.forEach(addDatum);

            return datums;
        };

        $scope.doSourceQuery = function(query, cb) {
            /* invoke callback without suggestions on error */
            var onErr = function() {
                cb([]);
            };

            /* invoke callback with converted completions on success */
            var onSucc = function(completions) {
                var datums = $scope.convertCompletions(query, completions);
                cb(datums);
            };

            var _cb = {
                error: onErr,
                success: onSucc
            };

            // treat end of input element selection as API caret position
            var selectionEnd = $scope.sourceInput[0].selectionEnd;
            console.log('at position ' + selectionEnd + ' querying "' + query + '"');
            if (query !== undefined && query.length > 0) {
                belhop.complete.getCompletions(query, selectionEnd, _cb);
            }
        };

        $scope.doTargetQuery = function(query, cb) {
            /* invoke callback without suggestions on error */
            var onErr = function() {
                cb([]);
            };

            /* invoke callback with converted completions on success */
            var onSucc = function(completions) {
                var datums = $scope.convertCompletions(query, completions);
                cb(datums);
            };

            var _cb = {
                error: onErr,
                success: onSucc
            };

            // treat end of input element selection as API caret position
            var selectionEnd = $scope.targetInput[0].selectionEnd;
            console.log('at position ' + selectionEnd + ' querying "' + query + '"');
            if (query !== undefined && query.length > 0) {
                belhop.complete.getCompletions(query, selectionEnd, _cb);
            }
        };

        $scope.sourceInput.typeahead(null, {
            name: 'belsource',
            displayKey: 'value',
            source: $scope.doSourceQuery,
            templates: {
                empty: null,
                suggestion: Handlebars.compile($scope.COMPLETION_TEMPLATE)
            }
        });
        $scope.sourceInput.on('typeahead:selected', $scope.selected);
        $scope.sourceInput.on('typeahead:autocompleted', $scope.selected);

        $scope.targetInput.typeahead(null, {
            name: 'beltarget',
            displayKey: 'value',
            source: $scope.doTargetQuery,
            templates: {
                empty: null,
                suggestion: Handlebars.compile($scope.COMPLETION_TEMPLATE)
            }
        });
        $scope.targetInput.on('typeahead:selected', $scope.selected);
        $scope.targetInput.on('typeahead:autocompleted', $scope.selected);

        $scope.sourceInput.keydown(function(ev) {
            if (ev.keyCode !== 37 && ev.keyCode !== 39) {
                return;
            }
            var ta = $scope.sourceInput.data().ttTypeahead;
            ta.dropdown.close();
        });

        $scope.sourceInput.keyup(function(ev) {
            if (ev.keyCode !== 37 && ev.keyCode !== 39) {
                return;
            }
            var ta = $scope.sourceInput.data().ttTypeahead;
            var curval = ta.getVal();
            ta.dropdown.update(curval);
            ta.dropdown.open();
        });

        $scope.targetInput.keydown(function(ev) {
            if (ev.keyCode !== 37 && ev.keyCode !== 39) {
                return;
            }
            var ta = $scope.targetInput.data().ttTypeahead;
            ta.dropdown.close();
        });

        $scope.targetInput.keyup(function(ev) {
            if (ev.keyCode !== 37 && ev.keyCode !== 39) {
                return;
            }
            var ta = $scope.targetInput.data().ttTypeahead;
            var curval = ta.getVal();
            ta.dropdown.update(curval);
            ta.dropdown.open();
        });
    }]);
