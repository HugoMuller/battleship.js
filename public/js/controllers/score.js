'use strict';

angular.module('bs.system').controller('ScoreController', ['$scope', 'Global', 'Timer', function($scope, Global, Timer){
  $scope.global = Global;
  $scope.timeElapsed = function(){
    var t = Timer.timeElapsed%3600;
    var h = Math.floor(Timer.timeElapsed/3600);
    var m = Math.floor(t/60);
    var s = t%60;
    
    if(h<10) h = '0'+h;
    if(m<10) m = '0'+m;
    if(s<10) s = '0'+s;
    
    return h+':'+m+':'+s;
  };
  $scope.score = 0;
  Timer.start();
}]);
