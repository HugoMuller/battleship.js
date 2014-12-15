'use strict';

(function(){
  describe('BattleShip services', function(){
    describe('Factory Node', function(){
      var Node;

      beforeEach(function(){
        module('bs.grid');
        inject(function($injector){
          Node = $injector.get('Node');
        });
      });

      it('should instanciate two nodes', function(){
        should.exist(Node);
        var actual = new Node(10, 20, true);
        var expected = {
          x: 10,
          y: 20,
          isBoat: true,
          isBombed: false
        };
        actual.should.eql(expected);
        
        actual = new Node();
        expected = {
          x: 0,
          y: 0,
          isBoat: false,
          isBombed: false
        };
        actual.should.eql(expected);
      });
    });
  });
})();
