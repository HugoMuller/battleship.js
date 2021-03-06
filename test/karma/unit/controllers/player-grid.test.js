'use strict';

(function(){
  describe('BattleShip controllers', function(){
    describe('Controller PlayerGridController', function(){
      var scope;
      var GridController;
      var Grid;

      var clearElementById = function(id){
        var elem = document.getElementById(id);
        if(!elem) return;
        while(elem.lastChild){
          elem.removeChild(elem.lastChild);
        }
      };
      
      beforeEach(function(){
        module('bs', 'bs.system', 'bs.lodash', 'bs.grid', 'templates.html');
        inject(function($controller, $injector, $rootScope, $compile, $templateCache){
          scope = $rootScope.$new();

          var elem = angular.element(document.body);
          elem.empty();
          elem.append($templateCache.get('grid-panel.html'));
          $compile(elem)(scope);
          scope.$digest();
          
          GridController = $controller('PlayerGridController', {
            $scope: scope
          });
          Grid = $injector.get('Grid');
        });
      });

      it('should expose some global scope', function(){
        scope.global.should.be.ok;
      });
      
      it('should perform a dragover and add green color on target cells horizontally', function(){
        var grid = document.getElementById('playerGrid');
        var draggedItem = document.getElementById('boat_cruiser');
        var coord = {
          x: 1,
          y: 1
        };
        var targetItem = grid.rows[coord.y].cells[coord.x];
        var length = draggedItem.getAttribute('boat-size');
        
        scope.handleShipDragOver(draggedItem, targetItem);
        
        for(var i=0; i<length; i++){
          var cell = grid.rows[coord.y].cells[coord.x+i];
          cell.style.backgroundColor.should.equal('green');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }
      });

      it('should perform a dragover and add green color on target cells vertically', function(){
        var grid = document.getElementById('playerGrid');
        var draggedItem = document.getElementById('boat_cruiser');
        draggedItem.setAttribute('boat-direction', 'vertical');
        var coord = {
          x: 1,
          y: 1
        };
        var targetItem = grid.rows[coord.y].cells[coord.x];
        var length = draggedItem.getAttribute('boat-size');

        scope.handleShipDragOver(draggedItem, targetItem);

        for(var i=0; i<length; i++){
          var cell = grid.rows[coord.y+i].cells[coord.x];
          cell.style.backgroundColor.should.equal('green');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }
      });

      it('should perform a dragover and add red color on target cells horizontally', function(){
        var grid = document.getElementById('playerGrid');
        var draggedItem = document.getElementById('boat_cruiser');
        var coord = {
          x: grid.rows[0].cells.length-1,
          y: 1
        };
        var targetItem = grid.rows[coord.y].cells[coord.x];
        var length = draggedItem.getAttribute('boat-size');

        scope.handleShipDragOver(draggedItem, targetItem);

        for(var i=0; i<length; i++){
          var X = coord.x+i;
          if(X<grid.rows[0].cells.length){
            var cell = grid.rows[coord.y].cells[X];
            cell.style.backgroundColor.should.equal('red');
            cell.classList.contains('bs-notDroppable').should.be.true;
          }else{
            break;
          }
        }
      });

      it('should perform a dragover and add red color on target cells vertically', function(){
        var grid = document.getElementById('playerGrid');
        var draggedItem = document.getElementById('boat_cruiser');
        draggedItem.setAttribute('boat-direction', 'vertical');
        var coord = {
          x: 1,
          y: grid.rows.length-1
        };
        var targetItem = grid.rows[coord.y].cells[coord.x];
        var length = draggedItem.getAttribute('boat-size');
        
        scope.handleShipDragOver(draggedItem, targetItem);

        for(var i=0; i<length; i++){
          var Y = coord.y+i;
          if(Y<grid.rows.length){
            var cell = grid.rows[Y].cells[coord.x];
            cell.style.backgroundColor.should.equal('red');
            cell.classList.contains('bs-notDroppable').should.be.true;
          }else{
            break;
          }
        }
      });

      it('should perform a dragleave and remove color of target cells horizontally', function(){
        var grid = document.getElementById('playerGrid');
        var draggedItem = document.getElementById('boat_cruiser');
        var coord = {
          x: 1,
          y: 1
        };
        var targetItem = grid.rows[coord.y].cells[coord.x];
        var length = draggedItem.getAttribute('boat-size');

        scope.handleShipDragOver(draggedItem, targetItem);

        var cell;
        for(var i=0; i<length; i++){
          cell = grid.rows[coord.y].cells[coord.x+i];
          cell.style.backgroundColor.should.equal('green');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }

        scope.handleShipDragLeave(draggedItem, targetItem);

        for(i=0; i<length; i++){
          cell = grid.rows[coord.y].cells[coord.x+i];
          cell.style.backgroundColor.should.equal('');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }
      });

      it('should perform a dragleave and remove color of target cells vertically', function(){
        var grid = document.getElementById('playerGrid');
        var draggedItem = document.getElementById('boat_cruiser');
        draggedItem.setAttribute('boat-direction', 'vertical');
        var coord = {
          x: 1,
          y: 1
        };
        var targetItem = grid.rows[coord.y].cells[coord.x];
        var length = draggedItem.getAttribute('boat-size');

        scope.handleShipDragOver(draggedItem, targetItem);

        var cell;
        for(var i=0; i<length; i++){
          cell = grid.rows[coord.y+i].cells[coord.x];
          cell.style.backgroundColor.should.equal('green');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }

        scope.handleShipDragLeave(draggedItem, targetItem);

        for(i=0; i<length; i++){
          cell = grid.rows[coord.y+i].cells[coord.x];
          cell.style.backgroundColor.should.equal('');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }
      });

      it('should perform a drop', function(){
        var grid = document.getElementById('playerGrid');
        var draggedItem = document.getElementById('boat_cruiser');
        draggedItem.setAttribute('boat-direction', 'vertical');
        var coord = {
          x: 1,
          y: 1
        };
        var targetItem = grid.rows[coord.y].cells[coord.x];
        var length = draggedItem.getAttribute('boat-size');

        scope.handleShipDragOver(draggedItem, targetItem);
        
        var cell;
        for(var i=0; i<length; i++){
          cell = grid.rows[coord.y+i].cells[coord.x];
          cell.style.backgroundColor.should.equal('green');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }

        scope.handleShipDrop(draggedItem, targetItem);

        for(i=0; i<length; i++){
          cell = grid.rows[coord.y+i].cells[coord.x];
          cell.style.backgroundColor.should.equal('');
          cell.style.backgroundImage.should.be.ok;
          cell.style.backgroundPosition.should.be.ok;
          cell.style.backgroundRepeat.should.equal('no-repeat');
          cell.classList.contains('bs-notDroppable').should.be.false;
        }
      });

      after(function(){
        clearElementById('playerGrid');
        clearElementById('enemyGrid');
      });
    });
  });
})();
