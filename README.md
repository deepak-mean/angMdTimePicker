# ang-md-time-picker

A Timepicker only directive using [Angular Material](https://material.angularjs.org/latest/) with support of [Moment.js](https://momentjs.com) and [Moment-Timezone](https://momentjs.com/timezone/docs/)

You can also set the steps for minutes to skip and also set any timezone to set time according to that timezone ( supporting [IANA timezones](https://www.iana.org/time-zones) which moment-timezone uses).

# Demo

See a working demo here [Demo](https://codepen.io/deepak-mean/pen/EwJwwR)


# Dependencies

1. [AngularJS ( 1.5 and above)](https://angularjs.org/#)
2. [Angular Material](https://material.angularjs.org/latest)
3. [Moment.js](https://momentjs.com)
4. [Moment-Timezone](https://momentjs.com/timezone/docs/) 

```
...

<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">

...
...

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.13/moment-timezone-with-data.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>

...
...
```


# How To Use


## Set up 

Clone or download the repository and include in your code.

Include CSS and JS files in yout html file 

```
...
..
<link rel="stylesheet" type="text/css" href="/path/to/repo/dist/angMdTimePicker.css" >
...

...
<script type="text/javascript" src="/path/to/repo/dist/angMdTimePicker.js"></script>
```

Include `angMdTimePicker` module dependency in your application

```
  angular.module('myApp', ['ngMaterial', 'angMdTimePicker']);

```

Use the directive in html

```
  <ang-md-time-picker ng-model="time" ng-click="$event.stopPropagation()"></ang-md-time-picker>
  
```

`time` is scope variable which is a date object .

### on-change
You can also pass a `on-change` option i.e. a function to be called on every change ( hours/minutes)

```
<ang-md-time-picker ng-model="time" on-change = "changeTime" ng-click="$event.stopPropagation()"></ang-md-time-picker>
```
`changeTime` will be a controller function which will accept a date parameter ( which will be updated value of `time` )


### step
You can also set the skip value for minutes.i.e. to skip the minutes to select. Pass `step` option

```
<ang-md-time-picker ng-model="time" on-change="changeTime" step="step" ng-click="$event.stopPropagation()"></ang-md-time-picker>
```

### timezone
You can pass the timezone to set time according to any specific timezone otherwise it will use default browser timezone using moment-timezone.

```
<ang-md-time-picker ng-model="time" on-change="changeTime" step="step" timezone="timezone" ng-click="$event.stopPropagation()"></ang-md-time-picker>
```
`timezone` must be a IANA standard timezone value that _moment-timezone_ supports.


## Controller code 

```
angular.module('myApp').controller('mainCtrl',['$scope',function($scope) {
    $scope.step = 1;
    $scope.time = new Date();
    $scope.timezone = "America/New_York";
    
    $scope.changeTime = function(date){
      console.log("updated value is",date);
    }
}]);
```




