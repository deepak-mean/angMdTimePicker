 /*
 * Angular Material Time Picker
 * https://github.com/deepak-mean/angMdTimePicker
 * @license MIT
 * v0.0.1
 */

(function(window, angular, undefined) {
  'use strict';

    angular.module('angMdTimePicker', ['ngMaterial']).directive("angMdTimePicker", function() {
        return {
            restrict: 'E',
             template : '<div class="material-time-picker">'+
'<div class="time">'+
'<md-select ng-model="hours" ng-change="changeTime()">'+
'<md-option ng-repeat="hour in hourOptions" ng-value="hour"> {{hour > 9 ? hour.toString() : "0" + hour.toString()}} </md-option>'+
'</md-select> <span>:</span>'+
'<md-select ng-model="minutes" ng-change="changeTime()">'+
'<md-option ng-repeat="min in minuteOptions" ng-value="min"> {{min > 9 ? min.toString() : "0" + min.toString()}} </md-option>'+
'</md-select>'+
'</div>'+
'<span class="meridian" ng-show="meridian ==\'am\'" ng-click="changeMeridian(\'pm\')">AM</span>'+
'<span class="meridian" ng-show="meridian ==\'pm\'" ng-click="changeMeridian(\'am\')">PM</span>'+ 
'</div>',
            require: 'ngModel',
            replace: true,
            scope: {
                step: "=?",
                timezone: "=?",
                onChange: "=?"
            },
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                $scope.minuteOptions = [];
                $scope.hourOptions = [];
                var len = 60 / $scope.step;
                var val = 0;
                for (var i = 0; i < len; i++) {
                    $scope.minuteOptions.push(val);
                    val += $scope.step;
                }

                // $scope.$on("time-changed",function(event,args){

                // })
                for (var i = 1; i < 13; i++) {
                    $scope.hourOptions.push(i);
                }

                $scope.changeTime = function() {
                    var date = moment($scope.modelValue).tz($scope.timezone);
                    if ($scope.meridian == 'pm' && $scope.hours < 12) {
                        var h = $scope.hours + 12;
                    } else if ($scope.meridian == 'am' && $scope.hours == 12) {
                        var h = 0;
                    } else {
                        var h = $scope.hours;
                    }
                    date.hours(h).minutes($scope.minutes);

                    if ($scope.onChange) {
                        $scope.onChange(date.format());
                    } else {
                        $scope.modelValue = new Date(date.format());
                    }
                }

                $scope.changeMeridian = function(value) {
                    $scope.meridian = value;
                    $scope.changeTime();
                }
            }],
            link: function(scope, iElement, iAttrs, ngModelCtrl) {
                //TODO
                //

                scope.$watch('modelValue', function(value, oldValue) {
                    if (new Date(value).getTime() !== new Date(oldValue).getTime()) {
                        var date = moment(value).tz(scope.timezone);
                        scope.minutes = date.minutes();
                        var h = date.hours();
                        if (h < 12) {
                            scope.meridian = "am";
                        } else {
                            scope.meridian = "pm";
                        }
                        scope.hours = h % 12 == 0 ? 12 : h % 12;
                        ngModelCtrl.$setViewValue(new Date(date.format()));
                    }
                });

                scope.$watch('step', function(value, oldValue) {
                    console.log("step is", scope.step);
                    scope.minuteOptions = [];
                    scope.hourOptions = [];
                    var len = 60 / scope.step;
                    var val = 0;
                    for (var i = 0; i < len; i++) {
                        scope.minuteOptions.push(val);
                        val += scope.step;
                    }

                    // $scope.$on("time-changed",function(event,args){

                    // })
                    for (var i = 1; i < 13; i++) {
                        scope.hourOptions.push(i);
                    }
                    setInitialValue();

                });
             
                scope.$watch('timezone', function(value, oldValue) {
                    scope.timezone = value;
                    setInitialValue();

                });

                var setInitialValue = function() {
                    var m, d, h;

                    if (!ngModelCtrl.$viewValue)
                        ngModelCtrl.$viewValue = new Date();
                    if (!scope.step)
                        scope.step = 1;
                    if (!scope.timezone)
                        scope.timezone = moment.tz.guess();

                    var date = new Date(ngModelCtrl.$viewValue);
                    var timezone = scope.timezone;
                    date = moment(date).tz(scope.timezone);

                    var dateMinutes = date.minutes();
                    if (dateMinutes % scope.step > 0)
                        m = scope.step * (Math.floor(dateMinutes / scope.step) + 1);
                    else if (dateMinutes % scope.step == 0)
                        m = dateMinutes;

                    h = date.hours();
                    if (m >= 60) {
                        m = 0;
                        date.add(1, "h");

                    }
                    date.minutes(m);
                    scope.minutes = date.minutes();
                    // date.setHours(date.getHours()+d >,scope.minutes,0);
                    var h = date.hours();
                    if (h < 12) {
                        scope.meridian = "am";
                    } else {
                        scope.meridian = "pm";
                    }

                    scope.hours = h % 12 == 0 ? 12 : h % 12;

                    scope.modelValue = new Date(date.format());
                }
                ngModelCtrl.$render = function() {
                    setInitialValue();
                };
            }
        }
    })

})(window, angular);
