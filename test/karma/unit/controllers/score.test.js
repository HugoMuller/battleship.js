'use strict';

(function(){
  describe('BattleShip controllers', function(){
    describe('Controller ScoreController', function(){
      var scope;
      var ScoreController;

      // Load the controllers module
      beforeEach(function(){
        module('bs.timer', 'bs.system');
        inject(function($controller, $rootScope){
          scope = $rootScope.$new();
          ScoreController = $controller('ScoreController', {
            $scope: scope
          });
        });
      });

      it('should expose some global scope', function(){
        scope.global.should.be.ok;
        scope.timeElapsed.should.be.a.Function;
        scope.score.should.equal(0);
      });
    });
  });
})();
