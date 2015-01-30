"use strict";

describe("directive: snVelocityGroup", function() {
    var element, scope, isolatedScope, _window, spy, keyframes;

    beforeEach(module("sn.velocity"));

    beforeEach(inject(function ($rootScope, $compile, $injector) {
        scope = $rootScope.$new();

        _window = $injector.get("$window");

        _window.Velocity = function(){};

        element =
            "<sn-velocity-group data-keyframes=\"{ '#elem1': [{ 'properties': { 'opacity': '1' }, 'options': { 'duration': '1000' } }] }\">" +
                "<div id=\"elem1\"></div>" +
            "</sn-velocity-group>";

        element = $compile(element)(scope);
        scope.$digest();

        isolatedScope = element.isolateScope();

    }));

    it("should attach directive options to scope", function (){
        expect(isolatedScope.keyframes).toEqual({ '#elem1': [{ 'properties': { 'opacity': '1' }, 'options': { 'duration': '1000' } }] });
    });

    it("should attach keyframes to scope of child", function (){

        var animateElementScope = angular.element(element).find("div").scope();

        expect(animateElementScope.keyframes).toEqual([{ properties: { opacity: '1' }, options: { duration: '1000' } }]);
    });

    it("should add attributes to child element", function (){

        var animateElement = angular.element(element).find("div");

        expect(animateElement.attr("sn-velocity")).toEqual("");
        expect(animateElement.attr("data-keyframes")).toEqual("keyframes");
    });

});

