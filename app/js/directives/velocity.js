"use strict";
/**
 * Angular wrapper for velocityjs
 * @author SOON_
 * @module sn.velocity.snVelocity
 * @class  snVelocity
 * @example
 *      <sn-velocity
 *          data-keyframes="[{'properties': { opacity: 0 }, 'options': { duration: 1000 }},{'properties': { opacity: 1 },'options': { duration: 1000 }}]"
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
                "loop": "=?"
            },
            link: function($scope, $element){

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
                    if ($scope.loop) {
                        $scope.keyframes[$scope.keyframes.length - 1].options.complete = $scope.animate;
                    }

                    $scope.animate();
                };

                $scope.init();

            }
        };
    }
]);
