'use strict';

(function(){
  describe('BattleShip controllers', function(){
    describe('HeaderController', function(){
      var scope;
      var HeaderController;
      
      beforeEach(function(){
        module('bs.system', 'bs.lang', 'bs');
        inject(function($controller, $rootScope){
          scope = $rootScope.$new();
          HeaderController = $controller('HeaderController', {
            $scope: scope
          });
        });
      });

      it('should expose some global scope', function(){
        scope.global.should.be.ok;
        scope.setLanguageTo.should.be.a.Function;
      });
    });
  });
})();