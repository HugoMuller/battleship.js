'use strict';

angular.module('bs.system').controller('PlayerGridController', ['$scope', 'Global', 'Grid', function($scope, Global, Grid){
  $scope.global = Global;
  
  this.id = 'playerGrid';
  this.isMine = true;
  this.grid = new Grid(this.id, 10, 10, this.isMine);
  this.grid.drawGrid();
  
  $scope.handleDrop = function(itemId, dropId){
    console.log('Item', itemId, 'dropped into', dropId);
  };
}]);
