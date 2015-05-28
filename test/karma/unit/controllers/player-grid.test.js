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
      
      it('should perform a dragover and add green color on target cells', function(){
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
          grid.rows[coord.y].cells[coord.x+i].style.backgroundColor.should.equal('green');
        }
      });

      it('should perform a dragover and add red color on target cells', function(){
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
            grid.rows[coord.y].cells[X].style.backgroundColor.should.equal('red');
          }
        }
      });

      it('should perform a dragleave and remove color of target cells', function(){
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
          grid.rows[coord.y].cells[coord.x+i].style.backgroundColor.should.equal('green');
        }

        scope.handleShipDragLeave(draggedItem, targetItem);

        for(var i=0; i<length; i++){
          grid.rows[coord.y].cells[coord.x+i].style.backgroundColor.should.equal('');
        }
      });

      it('should perform a drop', function(){
        //TODO
      });

      after(function(){
        clearElementById('playerGrid');
        clearElementById('enemyGrid');
      });
    });
  });
})();
