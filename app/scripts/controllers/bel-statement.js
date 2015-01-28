'use strict';

/**
 * @ngdoc function
 * @name belmgrWebApp.controller:NewbelCtrl
 * @description
 * # NewbelCtrl
 * Controller of the belmgrWebApp
 */
angular.module('belmgrWebApp')
  .controller('NewbelCtrl', function ($scope) {

    $scope.relations = [
        { label: 'increases', value: "increases" },
        { label: 'decreases', value: "decreases" },
        { label: 'directlyIncreases', value: "directlyIncreases" },
        { label: 'directlyDecreases', value: "directlyDecreases" }
    ];

    $scope.citation_types = [
        { label: 'PubmedID', value: "pubmedid" },
        { label: 'Journal', value: "journal" },
        { label: 'Online Resource', value: "onlineresource" },
        { label: 'Other', value: "other" }
    ];

    $scope.annotation_types = [
        { label: 'Anatomy', value: "anatomy" },
        { label: 'Cell Line', value: "cell-line" },
        { label: 'Cell Structure', value: "cell-structure" },
        { label: 'Cell', value: "cell" },
        { label: 'Disease', value: "disease" },
        { label: 'Mesh Anatomy', value: "mesh-anatomy" },
        { label: 'Mesh Diseases', value: "mesh-diseases" },
        { label: 'Species', value: "species-taxonomy-id" }
    ];

    $scope.COMPLETION_TEMPLATE = '<p>{{value}}</p>';
    $scope.sourceInput = angular.element('#belsource');
    $scope.targetInput = angular.element('#beltarget');

    $scope.selected = function(event, datum, name) {
        var element = null;
        if (name === 'belsource') {
            element = $scope.sourceInput[0];
        } else if (name === 'beltarget') {
            element = $scope.targetInput[0];
        }
        if (element === null) return;
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
            // looks odd but "completion" is a key in the actual completion object
            var completionType = completion.completion.type;
            var value = belhop.complete.apply(completion, input);
            var datum = {
                value: value,
                actions: completion.completion.actions
            };
            datums.push(datum);
        }
        /* add a datum for each completion */
        completions.forEach(addDatum);
        return datums;
    };

    $scope.doSourceQuery = function(query, cb) {
        /* invoke callback without suggestions on error */
        var onErr = function() { cb([]) };

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
        console.log('at position ' + selectionEnd + ' querying "' + query +'"');
        belhop.complete.getCompletions(query, selectionEnd, _cb);
    };

    $scope.doTargetQuery = function(query, cb) {
        /* invoke callback without suggestions on error */
        var onErr = function() { cb([]) };

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
        console.log('at position ' + selectionEnd + ' querying "' + query +'"');
        belhop.complete.getCompletions(query, selectionEnd, _cb);
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
  });
