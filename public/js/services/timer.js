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
    if(this.timerId === undefined) return false;
    
    var stopped = $interval.cancel(this.timerId);
    this.timerId = undefined;
    
    return stopped;
  };
  
  this.restart = function(){
    this.stop();
    this.start();
  };
  
  this.formattedTimeElapsed = function(){
    var t = this.timeElapsed%3600;
    var h = Math.floor(this.timeElapsed/3600);
    var m = Math.floor(t/60);
    var s = t%60;

    if(h<10) h = '0'+h;
    if(m<10) m = '0'+m;
    if(s<10) s = '0'+s;

    return h+':'+m+':'+s;
  };
  
  return this;
}]);
