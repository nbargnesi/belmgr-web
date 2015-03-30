'use strict';

describe('Controller: NewEvidenceController', function() {

  // load the controller's module
  beforeEach(module('belmgrWebApp'));

  var NewEvidenceController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    NewEvidenceController = $controller('NewEvidenceController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
