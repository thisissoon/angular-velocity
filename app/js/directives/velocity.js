"use strict";
/**
 * Angular wrapper for velocityjs
 * @author SOON_
 * @module sn.velocity.snVelocity
 * @class  snVelocity
 * @example
 *      <sn-velocity
 *          data-keyframes="[{'properties': { opacity: 0 }, 'options': { duration: 1000 }},{'properties': { opacity: 1 },'options': { duration: 1000 }}]"
 *          data-start-delay="1000"
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
            link: function($scope, $element){

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

                    // start delay - run animation on init or with start delay
                    if ($scope.startDelay) {
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
                    timer.cancel();
                };

                $scope.$on("$destroy", $scope.onDestroy);

                $scope.init();

            }
        };
    }
]);
