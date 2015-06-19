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
    var direction = draggedItem.getAttribute('boat-direction');
    var size = parseInt(draggedItem.getAttribute('boat-size'));
    var tileSize = 100/(size-1);
    var coord = {
      x: targetItem.cellIndex-1,
      y: targetItem.parentNode.rowIndex-1
    };
    var pos = (direction === 'horizontal') ? 'x' : 'y';
    for(var i=0; i<size; i++){
      if(grid.nodeExist(coord.x, coord.y)){
        var cellStyle = grid.getCellAt(coord.x+1, coord.y+1).style; 
        cellStyle.backgroundColor = '';
        var img = '/img/boats/' + draggedItem.id.replace('boat_', '') + '.png';
        cellStyle.backgroundImage = 'url("' + img + '")';
        cellStyle.backgroundRepeat = 'no-repeat';
        cellStyle.backgroundPosition = i*tileSize+'% 0%';
        grid.getNodeAt(coord.y, coord.x).isBoat = true;
      }
      ++coord[pos];
    }
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
    coord[pos] = lastCoord[pos];
    
    for(i=0; i<size; i++){
      if(grid.nodeExist(coord.x, coord.y)){
        var cell = grid.getCellAt(coord.x+1, coord.y+1);
        if(droppable){
          cell.style.backgroundColor = 'green';
        }else{
          cell.style.backgroundColor = 'red';
          cell.classList.add('bs-notDroppable'); 
        }
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
        var cell = grid.getCellAt(coord.x+1, coord.y+1);
        cell.style.backgroundColor = '';
        cell.classList.remove('bs-notDroppable');
      }
      ++coord[pos];
    }
  }
}]);
