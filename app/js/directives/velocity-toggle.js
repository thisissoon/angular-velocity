"use strict";
/**
 * @author      SOON_
 * @module      sn.velocity.snVelocityToggle
 * @class       snVelocityToggle
 * @description This directive makes it easy to create animations that track toggle states. Keyframe animations can be set for clickOn, clickOff, mouseEnter and mouseLeave events.
 * @example     <sn-velocity-toggle data-on-click-on="burger.in" data-on-click-off="burger.out"></sn-velocity-toggle>
 */
angular.module("sn.velocity.snVelocityToggle", [
    "sn.velocity.snVelocity"
])

.directive("snVelocityToggle", [
    "$rootScope",
    "$compile",
    "$window",
    /**
     * @constructor
     * @param   {Object}  $rootScope angular $rootScope object
     * @param   {Service} $compile   angular template compiler
     * @param   {Service} $window    angular wrapper for window
     */
    function($rootScope, $compile, $window) {
        return {
            restrict: "EA",
            scope: {
                "eventOn": "=",
                "eventOff": "=",
                "active": "=",
                "inactive": "="
            },
            link: function($scope, $element){

                /**
                 * Number of times animation has run
                 * @property {Number} toggleCount
                 */
                $scope.toggleCount = 0;

                /**
                 * State of click toggle
                 * 'true' when animationCount is even
                 * @property {Boolean} toggleState
                 */
                $scope.toggleState = false;

                /**
                 * Cache animation elements
                 * @property {Object} animatedElements
                 */
                $scope.animatedElements = {

                    /**
                     * Cached DOM elements for animation
                     * @property {Object} get
                     */
                    get: {},

                    /**
                     * Set animated element cache
                     * @param {Object} elementKeyframes animation keyframes object from attribute
                     */
                    set: function animatedElementsSetter(elementKeyframes) {
                        angular.forEach(elementKeyframes, function(keyframes, key){
                            var animationElement = $element[0].querySelector(key);
                            $scope.animatedElements.get[key] = animationElement;
                        });
                    }
                };

                $scope.animatedElements.set($scope.active);

                /**
                 * Run animation on child elements
                 * @param {Object} elementKeyframes   object of elements with keyframe arrays
                 */
                $scope.animate = function animate(elementKeyframes){

                    angular.forEach(elementKeyframes, function(keyframes, key){
                        var animationElement = $scope.animatedElements.get[key];
                        angular.forEach(keyframes, function(value){
                            $window.Velocity(animationElement, value.properties, value.options);
                        });
                    });

                };

                /**
                 * Check toggle state and animate to active/inactive state
                 * @method toggle
                 */
                $scope.toggle = function toggle() {
                    // stop current animation
                    angular.forEach($scope.animatedElements.get, function(animatedElement){
                        $window.Velocity(animatedElement, "stop");
                    });

                    // check current toggle state
                    if (!$scope.toggleState) {

                        // animate to active state
                        $scope.animate($scope.active);
                    } else {

                        // animate to active state
                        $scope.animate($scope.inactive);
                    }

                    // update toggle count and state
                    $scope.toggleCount = $scope.toggleCount + 1;
                    $scope.toggleState = !$scope.toggleState;
                };

                /**
                 * Attach toggle handler to events
                 */
                if ($scope.eventOn === $scope.eventOff) {
                    $element.on($scope.eventOn, $scope.toggle);
                } else {
                    $element.on($scope.eventOn, $scope.toggle);
                    $element.on($scope.eventOff, $scope.toggle);
                }

                /**
                 * Clear all listeners during angularjs garbage collection
                 * @method onDestroy
                 */
                $scope.onDestroy = function onDestroy() {
                    $element.off($scope.eventOn);
                    $element.off($scope.eventOff);
                };

                $rootScope.$on("$destroy", $scope.onDestroy);

            }
        };
    }
]);
