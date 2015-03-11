/*! angular-velocity - v0.1.0 - 2015-03-11 */
"use strict";
/**
 * Angular wrapper for velocityjs animation library
 * @requires velocityjs {@link https://github.com/julianshapiro/velocity}
 * @module sn.velocity
 * @author SOON_
 */
angular.module("sn.velocity", [
    "sn.velocity.snVelocity",
    "sn.velocity.snVelocityGroup",
    "sn.velocity.snVelocityToggle"
]);
;"use strict";
/**
 * @author SOON_
 * @module sn.velocity.snVelocityGroup
 * @class  snVelocityGroup
 * @example <sn-velocity-group data-keyframes=""></sn-velocity-group>
 */
angular.module("sn.velocity.snVelocityGroup", [
    "sn.velocity.snVelocity"
])

.directive("snVelocityGroup",[
    "$compile",
    "$rootScope",
    /**
     * @constructor
     *
     * @param   {Service} $compile   angular template compiler
     * @param   {Object}  $rootScope
     */
    function($compile, $rootScope) {
        return {
            restrict: "E",
            scope: {
                "keyframes": "=",
                "loop": "="
            },
            link: function($scope, $element, $attrs){

                angular.forEach($scope.keyframes, function(keyframes, key){
                    var animateElement = angular.element($element[0].querySelector(key));
                    var scope = $rootScope.$new();

                    // pass keyframes directly from keyframes array or from animation object with keyframes key
                    scope.keyframes = keyframes.keyframes || keyframes;

                    animateElement.attr("sn-velocity", "");
                    animateElement.attr("data-keyframes", "keyframes");

                    // pass start delay from animation object to velocity directive
                    if (keyframes.startDelay) {
                        animateElement.attr("data-start-delay", keyframes.startDelay);
                    }

                    // pass loop option to velocity directive
                    if ($scope.loop) {
                        animateElement.attr("data-loop", "");
                    }

                    $compile(animateElement)(scope);
                });

            }
        };
    }
]);
;"use strict";
/**
 * Angular wrapper for velocityjs
 * @author SOON_
 * @module sn.velocity.snVelocity
 * @class  snVelocity
 * @example
 *      <sn-velocity
 *          data-keyframes="[{'properties': { opacity: 0 }, 'options': { duration: 1000 }},{'properties': { opacity: 1 },'options': { duration: 1000 }}]"
 *          data-start-delay="1000"
 *          data-loop
 *      ></sn-velocity>
 */
angular.module("sn.velocity.snVelocity", []).directive("snVelocity",[
    "$window",
    "$timeout",
    /**
     * @constructor
     */
    function($window, $timeout) {
        return {
            restrict: "A",
            scope: {
                "keyframes": "=",
                "startDelay": "=?"
            },
            link: function($scope, $element, $attrs){

                var timer;

                /**
                 * Run animation
                 * @method animate
                 */
                $scope.animate = function animate() {
                    angular.forEach($scope.keyframes, function(value){
                        $window.Velocity($element, value.properties, value.options);
                    });
                };

                /**
                 * Trigger animation, with loop or start delay on initialisation
                 * @method init
                 */
                $scope.init = function init() {

                    // loop - call animation on completion of the last keyframe
                    if ($attrs.hasOwnProperty("loop")) {
                        $scope.keyframes[$scope.keyframes.length - 1].options.complete = $scope.animate;
                    }

                    // start delay - run animation on init or with start delay
                    if ($scope.startDelay) {
                        if (timer) {
                            $timeout.cancel(timer);
                        }

                        timer = $timeout($scope.animate, $scope.startDelay);
                    } else {
                        $scope.animate();
                    }
                };

                /**
                 * Clear all listeners during angularjs garbage collection
                 * @method onDestroy
                 */
                $scope.onDestroy = function onDestroy() {
                    if (timer) {
                        $timeout.cancel(timer);
                    }
                };

                $scope.$on("$destroy", $scope.onDestroy);

                $scope.init();

            }
        };
    }
]);
;"use strict";
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
                "eventOn": "@",
                "eventOff": "@",
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
