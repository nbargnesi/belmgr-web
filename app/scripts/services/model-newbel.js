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

        return {

            resetNewBel: function() {
                this.belStatement = belStatement;
                this.belCitation = belCitation;
                this.belAnnotation = belAnnotation;
                this.belMetadata = belMetadata;
            },
            updateNewBel: function() {
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
