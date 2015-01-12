'use strict';

(function(){
  describe('BattleShip services', function(){
    describe('Factory Grid', function(){
      var Grid;

      beforeEach(function(){
        module('bs.grid');
        inject(function($injector){
          Grid = $injector.get('Grid');
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
    });
  });
})();
