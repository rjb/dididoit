'use strict';

describe('Directive: focusHere', function () {

  // load the directive's module
  beforeEach(module('didiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<focus-here></focus-here>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the focusHere directive');
  }));
});
