"use strict";
/**
 * Angular wrapper for velocityjs
 * @author SOON_
 * @module sn.velocity.snVelocity
 * @class  snVelocity
 * @example <sn-velocity data-keyframes="[{'properties': { opacity: 0 }, 'options': { duration: 1000 }},{'properties': { opacity: 1 },'options': { duration: 1000 }}]"></sn-velocity>
 */
angular.module("sn.velocity.snVelocity", []).directive("snVelocity",[
    /**
     * @constructor
     */
    function() {
        return {
            restrict: "A",
            scope: {
                "keyframes": "="
            },
            link: function($scope, $element){

                angular.forEach($scope.keyframes, function(value){
                    Velocity($element, value.properties, value.options);
                });

            }
        }
    }
]);
