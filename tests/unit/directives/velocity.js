"use strict";

describe("directive: snVelocity", function() {
    var element, scope, isolatedScope, _window, spy, keyframes;

    beforeEach(module("sn.velocity"));

    beforeEach(inject(function ($rootScope, $compile, $injector) {
        scope = $rootScope.$new();

        _window = $injector.get("$window");

        _window.Velocity = function(){};
        spy = spyOn(_window, "Velocity");

        element =
            "<div sn-velocity data-keyframes=\"[{ 'properties': { 'opacity': '1' }, 'options': { 'duration': '1000' } }]\">" +
                "<div id=\"elem1\"></div>" +
            "</div>";

        element = $compile(element)(scope);
        scope.$digest();

        isolatedScope = element.isolateScope();

    }));

    it("should attach directive options to scope", function (){
        expect(isolatedScope.keyframes).toEqual([{ 'properties': { 'opacity': '1' }, 'options': { 'duration': '1000' } }]);
    });

    it("should initialise Velocity with keyframes", function (){
        expect(spy.calls.count()).toBe(1);
        expect(spy).toHaveBeenCalledWith(element, { 'opacity': '1' }, { 'duration': '1000' });
    });

    describe("option: loop", function(){

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            element =
                "<div sn-velocity data-loop=\"true\" data-keyframes=\"[{ 'properties': { 'opacity': '1' }, 'options': { 'duration': '1000' } }]\">" +
                    "<div id=\"elem1\"></div>" +
                "</div>";

            element = $compile(element)(scope);
            scope.$digest();

            isolatedScope = element.isolateScope();
        }));

        it("should attach directive options to scope", function(){
            expect(isolatedScope.loop).toBeTruthy();
        });

        it("should add complete function to last keyframe", function(){
            expect(isolatedScope.keyframes[0].options.complete).toEqual(isolatedScope.animate);
        });

    });

});

