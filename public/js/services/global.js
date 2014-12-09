'use strict';

//Global service for global variables
angular.module('bs.system').factory('Global', [function(){
  this._data = window.global || {};
  return this._data;
}]);
