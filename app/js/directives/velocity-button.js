"use strict";
/**
 * @author SOON_
 * @module sn.velocity.snVelocityButton
 * @class  snVelocityButton
 * @example <sn-velocity-button data-on-click-on="burger.in" data-on-click-off="burger.out"></sn-velocity-button>
 */
angular.module("sn.velocity.snVelocityButton", [
    "sn.velocity.snVelocity"
])

.directive("snVelocityButton",[
    "$compile",
    "$window",
    /**
     * @constructor
     * @param   {Service} $compile   angular template compiler
     * @param   {Service} $window    angular wrapper for window
     */
    function($compile, $window) {
        return {
            restrict: "EA",
            scope: {
                "onClickOn": "=?",
                "onClickOff": "=?",
                "onMouseEnter": "=?",
                "onMouseLeave": "=?"
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
                 * Run animation on child elements
                 * @param {Object} elementKeyframes   object of elements with keyframe arrays
                 */
                $scope.animate = function animate(elementKeyframes){

                    angular.forEach(elementKeyframes, function(keyframes, key){
                        var animationElement = $element[0].querySelector(key);
                        angular.forEach(keyframes, function(value){
                            $window.Velocity(animationElement, value.properties, value.options);
                        });
                    });

                    $scope.animatedCount = $scope.animatedCount + 1;
                    $scope.toggleState = !$scope.toggleState;

                };

                /**
                 * Bind click animation to click event
                 */
                if ($scope.onClickOn || $scope.onClickOff) {
                    $element.bind("click", function() {

                        if (!$scope.toggleState) {
                            $scope.animate($scope.onClickOn);
                        } else if ($scope.toggleState) {
                            $scope.animate($scope.onClickOff);
                        }

                    });
                }

                /**
                 * Bind onMouseEnter animation to onMouseEnter event
                 */
                if ($scope.onMouseEnter) {
                    $element.bind("mouseenter", function() {
                        $scope.animate($scope.onMouseEnter);
                    });
                }

                /**
                 * Bind onMouseLeave animation to onMouseLeave event
                 */
                if ($scope.onMouseLeave) {
                    $element.bind("mouseleave", function() {
                        angular.forEach($scope.animatedElements, function(animatedElement){
                            $window.Velocity(animatedElement, "stop");
                        });

                        $scope.animate($scope.onMouseLeave);
                    });
                }

            }
        };
    }
]);
