"use strict";
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
