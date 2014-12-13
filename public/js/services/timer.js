'use strict';

angular.module('bs.timer').factory('Timer', ['$interval', function($interval){
  this.timeElapsed = 0;
  
  this.start = function(){
    if(this.timer) return;
    
    this.timeElapsed = 0;
    var span = document.getElementById('timeElapsed');
    this.timer = $interval(function(){
      span.innerHTML = ++this.timeElapsed;
    }.bind(this), 1000);
  };
  
  this.stop = function(){
    if(this.timer === undefined) return;
    
    $interval.cancel(this.timer);
    this.timer = undefined;
  };
  
  this.restart = function(){
    this.stop();
    this.start();
  };
  
  return this;
}]);
