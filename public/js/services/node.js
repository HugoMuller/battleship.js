'use strict';

angular.module('bs.grid').factory('Node', [function(){
  return function(x, y, isBoat, boatType){
    this.x = x || 0;
    this.y = y || 0;
    this.isBoat = !!isBoat;
    this.isBombed = false;
    this.boatType = boatType || null;
  };
}]);
