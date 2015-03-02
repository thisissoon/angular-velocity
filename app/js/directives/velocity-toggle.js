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
                "onClickOnKeyframes": "=?onClickOn",
                "onClickOffKeyframes": "=?onClickOff",
                "onMouseEnterKeyframes": "=?onMouseEnter",
                "onMouseLeaveKeyframes": "=?onMouseLeave"
            },
            link: function($scope, $element){

                /**
                 * Number of times animation has run
                 * @property {Number} animatedCount
                 */
                $scope.animatedCount = 0;

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

                $scope.animatedElements.set($scope.onClickOnKeyframes || $scope.onClickOffKeyframes || $scope.onMouseEnterKeyframes || $scope.onMouseLeaveKeyframes);

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

                    $scope.animatedCount = $scope.animatedCount + 1;
                    $scope.toggleState = !$scope.toggleState;

                };

                /**
                 * On click event check toggle state and run toggle animation
                 * @method onClick
                 */
                $scope.onClick = function onClick() {
                    if ($scope.toggleState) {
                        // stop current animation
                        angular.forEach($scope.animatedElements.get, function(animatedElement){
                            $window.Velocity(animatedElement, "stop");
                        });

                        // run click off animation
                        $scope.animate($scope.onClickOffKeyframes);
                    } else {
                        // run click on animation
                        $scope.animate($scope.onClickOnKeyframes);
                    }
                };

                /**
                 * On mouseEnter event run animation
                 * @method onMouseEnter
                 */
                $scope.onMouseEnter = function onMouseEnter() {
                    // run on mouse enter animation
                    $scope.animate($scope.onMouseEnterKeyframes);
                };

                /**
                 * On mouseLeave event run animation
                 * @method onMouseLeave
                 */
                $scope.onMouseLeave = function onMouseLeave() {
                    // stop current animation
                    angular.forEach($scope.animatedElements.get, function(animatedElement){
                        $window.Velocity(animatedElement, "stop");
                    });

                    // run on mouse leave animation
                    $scope.animate($scope.onMouseLeaveKeyframes);
                };

                /**
                 * Bind click animation to click event if defined
                 */
                if ($scope.onClickOnKeyframes || $scope.onClickOffKeyframes) {
                    $element.on("click", $scope.onClick);
                }

                /**
                 * Bind onMouseEnter animation to onMouseEnter event if defined
                 */
                if ($scope.onMouseEnterKeyframes) {
                    $element.on("mouseenter", $scope.onMouseEnter);
                }

                /**
                 * Bind onMouseLeave animation to onMouseLeave event if defined
                 */
                if ($scope.onMouseLeaveKeyframes) {
                    $element.on("mouseleave", $scope.onMouseLeave);
                }

                /**
                 * Clear all listeners during angularjs garbage collection
                 * @method onDestroy
                 */
                $scope.onDestroy = function onDestroy() {
                    $element.off("click");
                    $element.off("mouseenter");
                    $element.off("mouseleave");
                };

                $rootScope.$on("$destroy", $scope.onDestroy);

            }
        };
    }
]);
