'use strict';

angular.module('bs.system').controller('ScoreController', ['$scope', 'Global', 'Timer', function($scope, Global, Timer){
  $scope.global = Global;
  $scope.timeElapsed = Timer.formattedTimeElapsed.bind(Timer);
  $scope.score = 0;
  $scope.timerStart = Timer.start.bind(Timer);
  $scope.timerStop = Timer.stop.bind(Timer);
  $scope.timerRestart = Timer.restart.bind(Timer);
}]);
