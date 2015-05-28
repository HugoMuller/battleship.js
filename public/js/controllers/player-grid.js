'use strict';

angular.module('bs.system').controller('PlayerGridController', ['$compile', '$scope', 'Global', 'Grid', function($compile, $scope, Global, Grid){
  $scope.global = Global;
  
  var id = 'playerGrid';
  var isMine = true;
  var width = 10;
  var height = 10;
  var lastCoord = {
    x: 0,
    y: 0
  };
  var grid = new Grid(id, width, height, isMine);
  grid.setTdAttributes({
    droppable : '',
    dropper   : 'dropper',
    drop      : 'handleShipDrop',
    dragover  : 'handleShipDragOver',
    dragenter : 'handleShipDragOver',
    dragleave : 'handleShipDragLeave'
  });
  grid.drawGrid(function(cell){
    $compile(cell)($scope);
  });
  
  $scope.handleShipDrop = function(draggedItem, targetItem){
    $scope.handleShipDragLeave(draggedItem, targetItem);
  };
  
  $scope.handleShipDragOver = function(draggedItem, targetItem){
    var droppable = true;
    var direction = draggedItem.getAttribute('boat-direction');
    var size = parseInt(draggedItem.getAttribute('boat-size'));
    lastCoord = {
      x: targetItem.cellIndex-1,
      y: targetItem.parentNode.rowIndex-1
    };
    var coord = {
      x: lastCoord.x,
      y: lastCoord.y
    };
    var pos = (direction === 'horizontal') ? 'x' : 'y';
    
    for(var i=0; i<size; i++){
      if(!grid.nodeExist(coord.x, coord.y) || grid.getNodeAt(coord.y, coord.x).isBoat){
        droppable = false;
        break;
      }
      ++coord[pos];
    }

    var backgroundColor = droppable ? 'green' : 'red';
    coord[pos] = lastCoord[pos];
    
    for(i=0; i<size; i++){
      if(grid.nodeExist(coord.x, coord.y)){
        grid.getCellAt(coord.x+1, coord.y+1).style.backgroundColor = backgroundColor;
      }
      ++coord[pos];
    }
  };
  
  $scope.handleShipDragLeave = function(draggedItem, targetItem){
    var direction = draggedItem.getAttribute('boat-direction');
    var size = parseInt(draggedItem.getAttribute('boat-size'));
    var coord = {
      x: targetItem.cellIndex-1,
      y: targetItem.parentNode.rowIndex-1
    };
    var pos = (direction === 'horizontal') ? 'x' : 'y';
    for(var i=0; i<size; i++){
      if(grid.nodeExist(coord.x, coord.y)){
        grid.getCellAt(coord.x+1, coord.y+1).style.backgroundColor = '#00A2E8';
      }
      ++coord[pos];
    }
  }
}]);
