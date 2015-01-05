'use strict';

//Global service for global variables
angular.module('bs.system').factory('Global', [function(){
  if(typeof window.global !== 'object') window.global = {};
  this._data = window.global;
  
  return this._data;
}]);
