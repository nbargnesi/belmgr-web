(function () {
   'use strict';

  /**
   * @ngdoc function
   * @name belmgrWebApp.controller:BELStatementFormController
   * @description
   * # BELStatementFormController
   * Controller of the belmgrWebApp
   */

  // angular.module('belmgrWebApp').controller('BELStatementFormController', belStatement);
  // belStatement.$inject = ['modelNewBel'];

  // function belStatement(modelNewBel) {
  //         // refrence of 'this' to be used for controllerAs in angular
  //         var controller = this;
          
  //         controller.relations = modelNewBel.getRelations();
          
  //     } // end of BELStatementFormController

  angular.module('belmgrWebApp')
    .controller('BELStatementFormController', ['$scope', 'modelNewBel', function($scope, modelNewBel) {

      // content and values for the relations dropdown
      $scope.relations = modelNewBel.getRelations();

      // Set up the default value for the relations dropdown box
      $scope.belSRelations = $scope.relations[0];

      $scope.bels = {
          belsubject: '',
          belobject: '',
          belrelation: $scope.relations[0]
      };

      // ng-change function to update the relation in service
      $scope.changeRelation = function() {
          modelNewBel.belStatement.relation = $scope.bels.belrelation.label;
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
      $scope.sourceInput = angular.element('#belsubject');
      $scope.targetInput = angular.element('#belobject');

      $scope.selected = function(event, datum, name) {

          var element = null;

          if (name === 'belsubject') {
              element = $scope.sourceInput[0];
              $scope.bels.belsubject = datum.value;
              modelNewBel.belStatement.subject = datum.value;
          } else if (name === 'belobject') {
              element = $scope.targetInput[0];
              $scope.bels.belobject = datum.value;
              modelNewBel.belStatement.object = datum.value;
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

      $scope.doSubjectQuery = function(query, cb) {
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

      $scope.doObjectQuery = function(query, cb) {
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
          name: 'belsubject',
          displayKey: 'value',
          source: $scope.doSubjectQuery,
          templates: {
              empty: null,
              suggestion: Handlebars.compile($scope.COMPLETION_TEMPLATE)
          }
      });
      $scope.sourceInput.on('typeahead:selected', $scope.selected);
      $scope.sourceInput.on('typeahead:autocompleted', $scope.selected);

      $scope.targetInput.typeahead(null, {
          name: 'belobject',
          displayKey: 'value',
          source: $scope.doObjectQuery,
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
}());
