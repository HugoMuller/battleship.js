'use strict';

(function(){
  describe('BattleShip services', function(){
    describe('Factory Grid', function(){
      var Grid;
      var Node;
      var matrix = [[0, 0, 0,  0,  10, 0,  0, 0, 0, 1],
                    [0, 0, 0,  0,  0,  10, 0, 0, 0, 1],
                    [0, 0, 0,  0,  0,  0,  0, 0, 0, 1],
                    [0, 1, 1,  0,  0,  0,  0, 0, 0, 1],
                    [0, 0, 0,  0,  0,  10, 0, 0, 0, 0],
                    [0, 0, 0,  10, 0,  0,  0, 0, 0, 0],
                    [0, 0, 0,  0,  0,  0,  0, 0, 0, 0],
                    [0, 0, 0,  0,  1,  1,  1, 0, 0, 0],
                    [0, 0, 0,  0,  0,  0,  0, 0, 0, 0],
                    [1, 1, 11, 11, 11, 0,  0, 0, 0, 0]];

      var clearElementById = function(id){
        var elem = document.getElementById(id);
        if(!elem) return;
        while(elem.lastChild){
          elem.removeChild(elem.lastChild);
        }
      };
      
      before(function(){
        module('templates.html');
        inject(function($templateCache, $compile, $rootScope){
          var scope = $rootScope.$new();
          var elem = angular.element(document.body);
          elem.empty();
          elem.append($templateCache.get('grid-panel.html'));
          $compile(elem)(scope);
          scope.$digest();
        });
      });
      
      beforeEach(function(){
        module('bs.system', 'bs.grid');
        inject(function($injector){
          Grid = $injector.get('Grid');
          Node = $injector.get('Node');
        });
      });

      it('should instanciate and build a basic Grid', function(){
        should.exist(Grid);
        var expected = {
          id     : 'playerGrid',
          isMine : true,
          width  : 10,
          height : 10
        };
        var actual = new Grid(expected.id, expected.width, expected.height, expected.isMine);
        actual.should.contain(expected);
        actual.nodes.length.should.equal(expected.width);
        actual.nodes[0].length.should.equal(expected.height);
        (actual.htmlTable instanceof Element).should.be.true;
        
        for(var x=0; x<expected.width; x++){
          for(var y=0; y<expected.height; y++){
            actual.nodes[x][y].should.contain({
              x: x,
              y: y,
              isBoat: false,
              isBombed: false
            });
          }
        }
      });
      
      it('should instanciate and buld a Grid from a matrix', function(){
        var expected = {
          id     : 'playerGrid',
          isMine : true,
          width  : matrix.length,
          height : matrix[0].length
        };
        
        var actual = new Grid(expected.id, expected.width, expected.height, expected.isMine, matrix);
        actual.should.contain(expected);
        actual.nodes.length.should.equal(expected.width);
        actual.nodes[0].length.should.equal(expected.height);
        
        for(var x=0; x<expected.width; x++){
          for(var y=0; y<expected.height; y++){
            var expectedNode = {
              x: x,
              y: y,
              isBoat: false,
              isBombed: false
            };
            
            switch(matrix[x][y]){
              case 0: break;
              case 1:
                expectedNode.isBoat = true;
                break;
              case 10:
                expectedNode.isBombed = true;
                break;
              case 11:
                expectedNode.isBoat = true;
                expectedNode.isBombed = true;
                break;
              default: throw new Error('invalid matrix');
            }
            
            actual.nodes[x][y].should.contain(expectedNode);
          }
        }
      });

      it('should return the node at coord (x, y)', function(){
        var data = {
          id     : 'playerGrid',
          isMine : true,
          width  : matrix.length,
          height : matrix[0].length
        };

        var grid = new Grid(data.id, data.width, data.height, data.isMine, matrix);
        var actual = grid.getNodeAt(0, 0);
        var expected = new Node(0, 0, false);
        actual.should.eql(expected);

        actual = grid.getNodeAt(0, 4);
        expected = new Node(0, 4, false);
        expected.isBombed = true;
        expected.should.eql(actual);

        actual = grid.getNodeAt(3, 1);
        expected = new Node(3, 1, true);
        expected.should.eql(actual);

        actual = grid.getNodeAt(9, 2);
        expected = new Node(9, 2, true);
        expected.isBombed = true;
        expected.should.eql(actual);
      });

      it('should build a grid in the DOM', function(){
        var data = {
          id     : 'playerGrid',
          isMine : true,
          width  : matrix.length,
          height : matrix[0].length
        };

        var grid = new Grid(data.id, data.width, data.height, data.isMine, matrix);
        grid.drawGrid();
        
        grid.htmlTable.rows.length.should.equal(data.height+1);
        grid.htmlTable.rows[0].cells.length.should.equal(data.width+1);
      });

      afterEach(function(){
        clearElementById('playerGrid');
        clearElementById('enemyGrid');
      });
    });
  });
})();
