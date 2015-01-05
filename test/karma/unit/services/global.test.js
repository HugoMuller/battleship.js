'use strict';

(function(){
  describe('BattleShip services', function(){
    describe('Factory Global', function(){
      var Global;

      beforeEach(function(){
        module('bs.system');
        inject(function($injector){
          Global = $injector.get('Global');
        });
      });

      describe('Invocation', function(){
        it('should return an object', function(){
          should.exist(Global);
          Global.should.be.an('object');
          Global.test = 'test';
        });

        it('should restitute the value set in the last test', function(){
          should.exist(Global);
          Global.should.be.an('object');
          should.exist(Global.test);
          Global.test.should.equal('test');
        });
      });
    });
  });
})();
