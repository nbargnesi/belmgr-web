(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name belmgrWebApp.modelNewBel
   * @description
   * # modelNewBel
   * Service in the belmgrWebApp.
   */
  angular.module('belmgrWebApp')
    .factory('modelNewBel', function() {

      // the default value of the model data
      var belStatement = {
          subject: '',
          relation: '',
          object: ''
        },
        belCitation = {
          citationType: '',
          name: '',
          publishDate: '',
          reference: '',
          authors: '',
          comments: ''
        },
        belAnnotation = {
          belSummaryText: '',
          structuredAnnotations: {
            annotationType: '',
            annotation: ''
          },
          freeAnnotations: {
            annotationType: '',
            annotation: ''
          }
        },
        belMetadata = {
          reviewStatus: '',
          author: '',
          createdDate: '',
          reviewer: '',
          reviewedDate: '',
          belEvidenceSource: ''
        };

      var evidenceObj = {};
      var relationsList = [{
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

      function createEvidence(belStatement, belCitation, belAnnotation, belMetadata) {

        convertCitationAuthors();
        var statement = '';
        if (belStatement.subject.length !== 0 && belStatement.relation.length !== 0 && belStatement.object.length !== 0) {
          statement = belStatement.subject + ' ' + belStatement.relation + ' ' + belStatement.object;
        }
        var citation = belhop.factory.citation(belCitation.reference, belCitation.citationType, belCitation.name, belCitation.publishDate, belCitation.authors, belCitation.comments);
        var annotations = createAnnotations();
        var summaryText = (belAnnotation.belSummaryText.length !== 0) ? belAnnotation.belSummaryText : null;
        var evidence = belhop.factory.evidence(statement, citation, annotations, summaryText, belMetadata);
        console.log(evidence);
        evidenceObj = evidence;

        function onErr() {

        }

        function onSucc(response) {
          console.log(response);
        }

        var cb = {
          error: onErr,
          success: onSucc
        }
        belhop.evidence.create(evidence, cb);

        function createAnnotations() {
          var result = [];
          belAnnotation.structuredAnnotations.forEach(function(annotation) {
            if (annotation.annotationType.length !== 0 && annotation.annotation.length !== 0) {
              result.push({
                name: annotation.annotationType,
                value: annotation.annotation
              });
            }
          });
          belAnnotation.freeAnnotations.forEach(function(annotation) {
            if (annotation.annotationType.length !== 0 && annotation.annotation.length !== 0) {
              result.push({
                name: annotation.annotationType,
                value: annotation.annotation
              });
            }
          });

          if (result.length !== 0) {
            return result;
          } else {
            return null;
          }
        }

        function convertCitationAuthors() {
          if (typeof belCitation.authors !== 'object') {
            belCitation.authors = belCitation.authors.split(';');
            belCitation.authors.forEach(function(author) {
              author.trim();
            });
          }
        }
      }

      return {
        getRelations: function() {
          return relationsList;
        },
        resetNewBel: function() {
          this.belStatement = belStatement;
          this.belCitation = belCitation;
          this.belAnnotation = belAnnotation;
          this.belMetadata = belMetadata;
        },
        updateNewBel: function() {
          createEvidence(this.belStatement, this.belCitation, this.belAnnotation, this.belMetadata);
          return {
            evidence: evidenceObj
          };
        },
        // the model holds the data for bel statements
        belStatement: {
          subject: '',
          relation: '',
          object: ''
        },
        // the model holds the data for bel citation
        belCitation: {
          citationType: '',
          name: '',
          publishDate: '',
          reference: '',
          authors: '',
          comments: ''
        },
        // the model holds the data for bel annotation
        belAnnotation: {
          belSummaryText: '',
          structuredAnnotations: [{
            annotationType: '',
            annotation: ''
          }],
          freeAnnotations: [{
            annotationType: '',
            annotation: ''
          }]
        },
        // the model holds the data for bel metadata
        belMetadata: {
          reviewStatus: '',
          author: '',
          createdDate: '',
          reviewer: '',
          reviewedDate: '',
          belEvidenceSource: ''
        },
        evidence: evidenceObj
      };
    });
}());
