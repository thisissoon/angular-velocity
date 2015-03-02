"use strict";

describe("directive: snVelocityToggle", function() {
    var clickElement, hoverElement, scope, isolatedScope1, isolatedScope2, _window, spy, spyDestroy, keyframes;

    beforeEach(module("sn.velocity"));

    beforeEach(inject(function ($rootScope, $compile, $injector) {
        scope = $rootScope.$new();

        _window = $injector.get("$window");

        _window.Velocity = function(){};
        spy = spyOn(_window, "Velocity");

        scope.keyframes = {
            in: {"#elem1": [{ "properties": { "opacity": "1" }, "options": { "duration": "1000" } }] },
            out: {"#elem1": [{ "properties": { "opacity": "0" }, "options": { "duration": "1000" } }] }
        };

        clickElement =
            "<sn-velocity-toggle data-event-on=\"'click'\" data-event-off=\"'click'\" data-active=\"keyframes.in\" data-inactive=\"keyframes.out\">" +
                "<div id=\"elem1\"></div>" +
            "</sn-velocity-toggle>";

        hoverElement =
            "<sn-velocity-toggle data-event-on=\"'mouseenter'\" data-event-off=\"'mouseleave'\" data-active=\"keyframes.in\" data-inactive=\"keyframes.out\">" +
                "<div id=\"elem1\"></div>" +
            "</sn-velocity-toggle>";

        clickElement = $compile(clickElement)(scope);
        hoverElement = $compile(hoverElement)(scope);

        scope.$digest();

        isolatedScope1 = clickElement.isolateScope();
        isolatedScope2 = hoverElement.isolateScope();

    }));

    it("should attach directive options to scope", function (){
        expect(isolatedScope1.eventOn).toEqual("click");
        expect(isolatedScope1.eventOff).toEqual("click");
        expect(isolatedScope1.active).toEqual(scope.keyframes.in);
        expect(isolatedScope1.inactive).toEqual(scope.keyframes.out);
        expect(isolatedScope2.eventOn).toEqual("mouseenter");
        expect(isolatedScope2.eventOff).toEqual("mouseleave");
        expect(isolatedScope2.active).toEqual(scope.keyframes.in);
        expect(isolatedScope2.inactive).toEqual(scope.keyframes.out);
    });

    it("should toggle velocity animation onClick", function() {
        clickElement.triggerHandler("click");
        expect(spy.calls.count()).toBe(2);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), { "opacity": "1" }, { "duration": "1000" });

        spy.calls.reset();

        clickElement.triggerHandler("click");
        expect(spy.calls.count()).toBe(2);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), { "opacity": "0" }, { "duration": "1000" });
    });

    it("should call active velocity animation onMouseEnter", function() {
        hoverElement.triggerHandler("mouseenter");
        expect(spy.calls.count()).toBe(2);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), { "opacity": "1" }, { "duration": "1000" });
    });

    it("should call inactive velocity animation onMouseLeave", function() {
        hoverElement.triggerHandler("mouseleave");
        expect(spy.calls.count()).toBe(2);

        expect(spy.calls.all()[0].args).toEqual(jasmine.any(Object), "stop");
        expect(spy.calls.all()[1].args).toEqual(jasmine.any(Object), { "opacity": "0" }, { "duration": "1000" });
    });

});
