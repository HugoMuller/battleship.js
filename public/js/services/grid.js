'use strict';

angular.module('bs.grid').factory('Grid', ['Node', '_', function(Node, _){
  /* istanbul ignore next */
  var appendTh = function(row, content){
    var th = document.createElement('th');
    th.innerHTML = (content !== undefined) ? content : '';
    row.appendChild(th);
  };
  /* istanbul ignore next */
  var prependTh = function(row, content){
    var th = document.createElement('th');
    th.innerHTML = (content !== undefined) ? content : '';
    row.insertBefore(th, row.firstChild);
  };
  /* istanbul ignore next */
  var num2alpha = function(n){
    return String.fromCharCode(65+n);
  };
  /* istanbul ignore next */
  var fadeTh = function(htmlTable, cell, fade){
    var bgColor = '#7C1E79';
    var color = 'white';
    
    if(fade){
      bgColor = 'white';
      color = '#7C1E79';
    }

    var topCell = htmlTable.rows[0].cells[cell.cellIndex];
    var leftCell = htmlTable.rows[cell.parentNode.rowIndex].cells[0];
    topCell.style.backgroundColor  = bgColor;
    leftCell.style.backgroundColor = bgColor;
    topCell.style.color  = color;
    leftCell.style.color = color;
  };
  
  var Grid = function(id, width, height, isMine, matrix){
    this.id = id;
    this.htmlTable = document.getElementById(this.id);
    this.isMine = !!isMine;
    this.nodes = [];
    this.width = width;
    this.height = height;
    this._attr = {};

    if(matrix) this.buildGridFromMatrix(matrix);
    else this.buildGrid();
  };

  Grid.prototype.setTdAttributes = function(attr){
    if(_.isPlainObject(attr)){
      if(!_.isPlainObject(this._attr)){
        this._attr = {};
      }
      this._attr.td = attr;
    }else{
      throw new Error('ERROR: Grid.setAttributes, parameter \'attr\' should be an object');
    }
  };
  
  Grid.prototype.getNodeAt = function(x, y){
    return this.nodes[x][y];
  };

  Grid.prototype.getCellAt = function(x, y){
    return this.htmlTable.rows[y].cells[x];
  };

  /* istanbul ignore next */
  Grid.prototype.nodeExist = function(x, y){
    return (x>=0 && x<this.width && y>=0 && y<this.height);
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
        this.nodes[x][y] = new Node(x, y, (ref === 1 || ref === 11));
        this.nodes[x][y].isBombed = (ref === 10 || ref === 11);
      }
    }
  };

  Grid.prototype.drawGrid = function(callback){
    var self = this;
    var row;
    for(var y=0; y<this.height; y++){
      row = this.htmlTable.insertRow(y);
      for(var x=0; x<this.width; x++){
        var cell = row.insertCell(x);
        var classes = [];
        if(this.getNodeAt(y, x).isBoat) classes.push('isBoat');
        if(this.getNodeAt(y, x).isBombed) classes.push('isBombed');
        cell.className = classes.join(' ');
        cell.onmouseover = fadeTh.bind(self, self.htmlTable, cell, true);
        cell.onmouseout = fadeTh.bind(self, self.htmlTable, cell, false);
        if(!this.isMine){
          cell.onclick = self.generateOnClick.bind(self, cell);
        }
        if(_.isPlainObject(this._attr) && _.isPlainObject(this._attr.td)){
          Object.keys(this._attr.td).forEach(function(attr){
            cell.setAttribute(attr, self._attr.td[attr]);
          });
        }
        if(typeof callback === 'function') callback(cell);
      }
      prependTh(row, num2alpha(y));
    }
    row = this.htmlTable.insertRow(0);
    appendTh(row);
    for(var w=0; w<this.width; w++){
      appendTh(row, w+1);
    }
  };

  Grid.prototype.generateOnClick = function(cell){
    console.log('click on cell ('+cell.cellIndex+', '+cell.parentNode.rowIndex+')');
    console.dir(this.getNodeAt(cell.parentNode.rowIndex-1, cell.cellIndex-1));
  };

  return Grid;
}]);
