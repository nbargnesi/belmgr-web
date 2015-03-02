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
                source: '',
                relation: '',
                target: ''
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

        function createEvidence(belStatement, belCitation, belAnnotation, belMetadata) {
            
            var statement = belStatement.source + ' ' + belStatement.relation + ' ' + belStatement.target;
            var citation = belhop.factory.citation(belCitation.reference, belCitation.citationType, belCitation.name, belCitation.publishDate, belCitation.authors, belCitation.comments);
            var annotations = createAnnotations();
            var summaryText = (belAnnotation.belSummaryText.length !== 0) ? belAnnotation.belSummaryText : null;
            var evidence = belhop.factory.evidence(statement, citation, annotations, summaryText, belMetadata);
            console.log(evidence);

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
        }

        return {
            resetNewBel: function() {
                this.belStatement = belStatement;
                this.belCitation = belCitation;
                this.belAnnotation = belAnnotation;
                this.belMetadata = belMetadata;
            },
            updateNewBel: function() {
                createEvidence(this.belStatement, this.belCitation, this.belAnnotation, this.belMetadata);
                return {
                    belStatement: this.belStatement,
                    belCitation: this.belCitation,
                    belAnnotation: this.belAnnotation,
                    belMetadata: this.belMetadata
                };
            },
            // the model holds the data for bel statements
            belStatement: {
                source: '',
                relation: '',
                target: ''
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
            }
        };
    });
