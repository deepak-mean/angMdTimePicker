angular.module('demoApp',['ngMaterial','angMdTimePicker']).controller('mainCtrl', ['$scope', function($scope) {
    $scope.time = new Date();
    $scope.step = 1;
    $scope.stepOptions = [];
    for (var i = 1; i < 31; i++) {
        $scope.stepOptions.push(i);
    }
    $scope.getTimeFormat = function(date) {
        return moment(date).format("dddd,DD MMMM YYYY hh:mm a");
    }
}]);