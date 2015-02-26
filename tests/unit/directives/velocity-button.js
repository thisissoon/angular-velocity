"use strict";

describe("directive: snVelocityButton", function() {
    var clickElement, hoverElement, scope, isolatedScope1, isolatedScope2, _window, spy, spyDestroy, keyframes;

    beforeEach(module("sn.velocity"));

    beforeEach(inject(function ($rootScope, $compile, $injector) {
        scope = $rootScope.$new();

        _window = $injector.get("$window");

        _window.Velocity = function(){};
        spy = spyOn(_window, "Velocity");

        scope.keyframes = {
            in: {'#elem1': [{ 'properties': { 'opacity': '1' }, 'options': { 'duration': '1000' } }] },
            out: {'#elem1': [{ 'properties': { 'opacity': '0' }, 'options': { 'duration': '1000' } }] }
        };

        clickElement =
            "<sn-velocity-button data-on-click-on=\"keyframes.in\" data-on-click-off=\"keyframes.out\">" +
                "<div id=\"elem1\"></div>" +
            "</sn-velocity-button>";

        hoverElement =
            "<sn-velocity-button data-on-mouse-enter=\"keyframes.in\" data-on-mouse-leave=\"keyframes.out\">" +
                "<div id=\"elem1\"></div>" +
            "</sn-velocity-button>";

        clickElement = $compile(clickElement)(scope);
        hoverElement = $compile(hoverElement)(scope);

        scope.$digest();

        isolatedScope1 = clickElement.isolateScope();
        isolatedScope2 = hoverElement.isolateScope();

    }));

    it("should attach directive options to scope", function (){
        expect(isolatedScope1.onClickOnKeyframes).toEqual(scope.keyframes.in);
        expect(isolatedScope1.onClickOffKeyframes).toEqual(scope.keyframes.out);
        expect(isolatedScope2.onMouseEnterKeyframes).toEqual(scope.keyframes.in);
        expect(isolatedScope2.onMouseLeaveKeyframes).toEqual(scope.keyframes.out);
    });

    it("should call velocity animation onClick", function() {
        clickElement.triggerHandler("click");
        expect(spy.calls.count()).toBe(1);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), { "opacity": "1" }, { "duration": "1000" });

        clickElement.triggerHandler("click");
        expect(spy.calls.count()).toBe(3);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), { "opacity": "0" }, { "duration": "1000" });
    });

    it("should call velocity animation onMouseEnter", function() {
        hoverElement.triggerHandler("mouseenter");
        expect(spy.calls.count()).toBe(1);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), { "opacity": "1" }, { "duration": "1000" });
    });

    it("should call velocity animation onMouseLeave", function() {
        hoverElement.triggerHandler("mouseleave");
        expect(spy.calls.count()).toBe(2);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), { "opacity": "0" }, { "duration": "1000" });
    });

});
