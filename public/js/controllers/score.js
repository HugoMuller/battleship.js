'use strict';

angular.module('bs.system').controller('ScoreController', ['$scope', 'Global', 'Timer', function($scope, Global, Timer){
  $scope.global = Global;
  $scope.timeElapsed = function(){
    return Timer.timeElapsed;
  };
  $scope.score = 0;
}]);
