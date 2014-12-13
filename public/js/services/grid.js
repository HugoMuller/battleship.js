'use strict';

angular.module('bs.grid').factory('Grid', ['Node', function(Node){
  var appendTh = function(row, content){
    var th = document.createElement('th');
    th.innerHTML = (content !== undefined) ? content : '';
    row.appendChild(th);
  };

  var prependTh = function(row, content){
    var th = document.createElement('th');
    th.innerHTML = (content !== undefined) ? content : '';
    row.insertBefore(th, row.firstChild);
  };

  var num2alpha = function(n){
    return String.fromCharCode(65+n);
  };

  var fadeTh = function(tableId, x, y, fade){
    var grid = document.getElementById(tableId);
    var bgColor;
    var color;
    if(fade){
      bgColor = 'white';
      color = '#7C1E79';
    }else{
      bgColor = '#7C1E79';
      color = 'white';
    }
    
    var topCell = grid.rows[0].cells[x];
    var leftCell = grid.rows[y].cells[0];
    topCell.style.backgroundColor  = bgColor;
    leftCell.style.backgroundColor = bgColor;
    topCell.style.color  = color;
    leftCell.style.color = color;
  };
  
  var Grid = function(id, width, height, isMine, matrix){
    this.id = id;
    this.isMine = !!isMine;
    this.nodes = [];
    this.width = width;
    this.height = height;

    if(matrix) this.buildGridFromMatrix(matrix);
    else this.buildGrid();
  };

  Grid.prototype.getNodeAt = function(x, y){
    return this.nodes[x][y];
  };

  Grid.prototype.buildGrid = function(){
    for(var x=0; x<this.width; x++){
      this.nodes[x] = [];
      for(var y=0; y<this.height; y++){
        this.nodes[x][y] = new Node(x, y);
      }
    }
  };

  Grid.prototype.buildGridFromMatrix = function(matrix){
    for(var x=0; x<this.width; x++){
      this.nodes[x] = [];
      for(var y=0; y<this.height; y++){
        var ref = matrix[x][y];
        this.nodes[x][y] = new Node(x, y, (ref === 1 || ref === 3));
        this.nodes[x][y].isBombed = (ref === 2 || ref === 3);
      }
    }
  };

  Grid.prototype.drawGrid = function(){
    var self = this;
    var grid = document.getElementById(this.id);

    for(var y=0; y<this.height; y++){
      var row = grid.insertRow(y);
      for(var x=0; x<this.width; x++){
        var cell = row.insertCell(x);
        var classes = [];
        if(this.getNodeAt(y, x).isBoat) classes.push('isBoat');
        if(this.getNodeAt(y, x).isBombed) classes.push('isBombed');
        cell.className = classes.join(' ');
        cell.onmouseover = function(){
          fadeTh(self.id, this.cellIndex, this.parentNode.rowIndex, true);
        };
        cell.onmouseout = function(){
          fadeTh(self.id, this.cellIndex, this.parentNode.rowIndex);
        };
        if(!self.isMine){
          cell.onclick = function(){
            self.generateOnClick(this);
          };
        }
      }
      prependTh(row, num2alpha(y));
    }
    row = grid.insertRow(0);
    appendTh(row);
    for(x=0; x<this.width; x++){
      appendTh(row, x+1);
    }
  };

  Grid.prototype.generateOnClick = function(cell){
    console.log('click on cell ('+cell.cellIndex+', '+cell.parentNode.rowIndex+')');
    console.dir(this.getNodeAt(cell.parentNode.rowIndex-1, cell.cellIndex-1));
  };

  return Grid;
}]);
