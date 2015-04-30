'use strict';

angular.module('bs.system').controller('EnemyGridController', ['$scope', 'Global', 'Grid', function($scope, Global, Grid){
  $scope.global = Global;

  this.id = 'enemyGrid';
  this.isMine = false;
  this.grid = new Grid(this.id, 10, 10, this.isMine);
  this.grid.drawGrid();
}]);
