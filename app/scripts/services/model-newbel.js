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

        var modelNewBel = {
            createEvidence: createEvidence,
            belStatement: belStatement,
            belCitation: belCitation,
            belAnnotation: belAnnotation,
            belMetadata: belMetadata
        };

        return modelNewBel;

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

        function createEvidence() {
            belhop.factory.evidence();
        }
    });
