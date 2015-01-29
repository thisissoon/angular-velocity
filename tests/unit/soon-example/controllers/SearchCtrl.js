"use strict";

describe("SearchCtrl", function (){

    var _scope, _rootScope, _http, _location, $httpBackend;

    beforeEach(function(){
        module("sn.example");
    });

    beforeEach(inject(function ($injector, $rootScope, $controller) {

        _scope = $rootScope.$new();
        _rootScope = $rootScope;
        _http = $injector.get("$http");
        _location = $injector.get("$location");
        _location.path = function(){}

        spyOn(_location, "path");

        $httpBackend = $injector.get("$httpBackend");

        $httpBackend.whenGET(/.*\/maps\/api\/geocode\/json.*/).respond({ "results" : [ { "address_components" : [ { "long_name" : "London", "short_name" : "London", "types" : [ "locality", "political" ] }, { "long_name" : "United Kingdom", "short_name" : "GB", "types" : [ "country", "political" ] } ], "formatted_address" : "London, UK", "geometry" : { "bounds" : { "northeast" : { "lat" : 51.6723432, "lng" : 0.148271 }, "southwest" : { "lat" : 51.38494009999999, "lng" : -0.3514683 } }, "location" : { "lat" : 51.5073509, "lng" : -0.1277583 }, "location_type" : "APPROXIMATE", "viewport" : { "northeast" : { "lat" : 51.6723432, "lng" : 0.148271 }, "southwest" : { "lat" : 51.38494009999999, "lng" : -0.3514683 } } }, "types" : [ "locality", "political" ] }, { "address_components" : [ { "long_name" : "London", "short_name" : "London", "types" : [ "locality", "political" ] }, { "long_name" : "Middlesex County", "short_name" : "Middlesex County", "types" : [ "administrative_area_level_2", "political" ] }, { "long_name" : "Ontario", "short_name" : "ON", "types" : [ "administrative_area_level_1", "political" ] }, { "long_name" : "Canada", "short_name" : "CA", "types" : [ "country", "political" ] } ], "formatted_address" : "London, ON, Canada", "geometry" : { "bounds" : { "northeast" : { "lat" : 43.073245, "lng" : -81.1063879 }, "southwest" : { "lat" : 42.824517, "lng" : -81.390852 } }, "location" : { "lat" : 42.9869502, "lng" : -81.243177 }, "location_type" : "APPROXIMATE", "viewport" : { "northeast" : { "lat" : 43.073245, "lng" : -81.1063879 }, "southwest" : { "lat" : 42.824517, "lng" : -81.390852 } } }, "types" : [ "locality", "political" ] }, { "address_components" : [ { "long_name" : "London", "short_name" : "London", "types" : [ "locality", "political" ] }, { "long_name" : "Laurel County", "short_name" : "Laurel County", "types" : [ "administrative_area_level_2", "political" ] }, { "long_name" : "Kentucky", "short_name" : "KY", "types" : [ "administrative_area_level_1", "political" ] }, { "long_name" : "United States", "short_name" : "US", "types" : [ "country", "political" ] } ], "formatted_address" : "London, KY, USA", "geometry" : { "bounds" : { "northeast" : { "lat" : 37.1522599, "lng" : -84.03595709999999 }, "southwest" : { "lat" : 37.0797589, "lng" : -84.126262 } }, "location" : { "lat" : 37.1289771, "lng" : -84.08326459999999 }, "location_type" : "APPROXIMATE", "viewport" : { "northeast" : { "lat" : 37.1522599, "lng" : -84.03595709999999 }, "southwest" : { "lat" : 37.0797589, "lng" : -84.126262 } } }, "types" : [ "locality", "political" ] }, { "address_components" : [ { "long_name" : "London", "short_name" : "London", "types" : [ "locality", "political" ] }, { "long_name" : "Madison County", "short_name" : "Madison County", "types" : [ "administrative_area_level_2", "political" ] }, { "long_name" : "Ohio", "short_name" : "OH", "types" : [ "administrative_area_level_1", "political" ] }, { "long_name" : "United States", "short_name" : "US", "types" : [ "country", "political" ] }, { "long_name" : "43140", "short_name" : "43140", "types" : [ "postal_code" ] } ], "formatted_address" : "London, OH 43140, USA", "geometry" : { "bounds" : { "northeast" : { "lat" : 39.921786, "lng" : -83.3899969 }, "southwest" : { "lat" : 39.85928, "lng" : -83.47892299999999 } }, "location" : { "lat" : 39.8864493, "lng" : -83.4482529 }, "location_type" : "APPROXIMATE", "viewport" : { "northeast" : { "lat" : 39.921786, "lng" : -83.3899969 }, "southwest" : { "lat" : 39.85928, "lng" : -83.47892299999999 } } }, "types" : [ "locality", "political" ] } ], "status" : "OK" });

        $controller("SearchCtrl", {
            $scope: _scope,
            $rootScope: _rootScope,
            $http: _http,
            $location: _location

        });

    }));

    it("should get locations search results", function (){
        _scope.getLocation("foo");
        $httpBackend.flush();
        expect(_rootScope.results.length).toBe(4);
        expect(_rootScope.results[0]).toEqual({ "address_components": [ { "long_name": "London", "short_name": "London", "types": [ "locality", "political" ] }, { "long_name": "United Kingdom", "short_name": "GB", "types": [ "country", "political" ] } ], "formatted_address": "London, UK", "geometry": { "bounds": { "northeast": { "lat": 51.6723432, "lng": 0.148271 }, "southwest": { "lat": 51.38494009999999, "lng": -0.3514683 } }, "location": { "lat": 51.5073509, "lng": -0.1277583 }, "location_type": "APPROXIMATE", "viewport": { "northeast": { "lat": 51.6723432, "lng": 0.148271 }, "southwest": { "lat": 51.38494009999999, "lng": -0.3514683 } } }, "types": [ "locality", "political" ] });
        expect(_location.path).toHaveBeenCalledWith("/results");
    });


});
