'use strict';

angular.module('bs.system').controller('GridController', ['$scope', 'Global', 'Grid', function($scope, Global, Grid){
  $scope.global = Global;
  
  $scope.init = function(options){
    options = options || { id: 'playerGrid', isMine: true };
    this.grid = new Grid(options.id, 10, 10, options.isMine);
    this.grid.drawGrid();
  }.bind(this);
}]);
