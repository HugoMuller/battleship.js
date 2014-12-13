'use strict';

(function(){
  describe('BattleShip controllers', function(){
    describe('IndexController', function(){
      var scope;
      var IndexController;

      // Load the controllers module
      beforeEach(function(){
        module('bs.system');
        inject(function($controller, $rootScope){
          scope = $rootScope.$new();
          IndexController = $controller('IndexController', {
            $scope: scope
          });
        });
      });

      it('should expose some global scope', function(){
        scope.global.should.be.ok;
      });
    });
  });
})();