/*! angular-velocity - v0.0.4 - 2015-02-16 */
"use strict";
/**
 * Angular wrapper for velocityjs animation library
 * @requires velocityjs {@link https://github.com/julianshapiro/velocity}
 * @module sn.velocity
 * @author SOON_
 */
angular.module("sn.velocity", [
    "sn.velocity.snVelocity",
    "sn.velocity.snVelocityGroup"
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
                "keyframes": "="
            },
            link: function($scope, $element){

                angular.forEach($scope.keyframes, function(keyframes, key){
                    var animateElement = angular.element($element[0].querySelector(key));
                    var scope = $rootScope.$new();
                    scope.keyframes = keyframes;

                    animateElement.attr("sn-velocity", "");
                    animateElement.attr("data-keyframes", "keyframes");

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
 * @example <sn-velocity data-keyframes="[{'properties': { opacity: 0 }, 'options': { duration: 1000 }},{'properties': { opacity: 1 },'options': { duration: 1000 }}]"></sn-velocity>
 */
angular.module("sn.velocity.snVelocity", []).directive("snVelocity",[
    "$window",
    /**
     * @constructor
     */
    function($window) {
        return {
            restrict: "A",
            scope: {
                "keyframes": "="
            },
            link: function($scope, $element){

                angular.forEach($scope.keyframes, function(value){
                    $window.Velocity($element, value.properties, value.options);
                });

            }
        };
    }
]);
