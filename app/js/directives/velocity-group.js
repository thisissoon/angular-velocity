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
            link: function($scope, $element){

                angular.forEach($scope.keyframes, function(keyframes, key){
                    var animateElement = angular.element($element[0].querySelector(key));
                    var scope = $rootScope.$new();
                    scope.keyframes = keyframes;

                    animateElement.attr("sn-velocity", "");
                    animateElement.attr("data-keyframes", "keyframes");

                    // pass loop option to velocity directive
                    if ($scope.loop) {
                        animateElement.attr("data-loop", "true");
                    }

                    $compile(animateElement)(scope);
                });

            }
        };
    }
]);
