'use strict';

angular.module('bs.timer').factory('Timer', ['$interval', function($interval){
  this.timeElapsed = 0;
  
  this.start = function(){
    if(this.timerId !== undefined) return;

    this.timeElapsed = 0;
    this.timerId = $interval(function(){
      this.timeElapsed++;
    }.bind(this), 1000);
  };
  
  this.stop = function(){
    if(this.timerId === undefined) return;
    
    $interval.cancel(this.timerId);
    this.timerId = undefined;
  };
  
  this.restart = function(){
    this.stop();
    this.start();
  };
  
  return this;
}]);
