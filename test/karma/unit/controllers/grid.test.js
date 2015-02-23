'use strict';

(function(){
  describe('BattleShip controllers', function(){
    describe('Controller GridController', function(){
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
        module('bs.system', 'bs.grid', 'templates.html');
        inject(function($controller, $injector, $rootScope, $compile, $templateCache){
          scope = $rootScope.$new();
          var elem = angular.element(document.body);
          elem.empty();
          elem.append($templateCache.get('grid-panel.html'));
          $compile(elem)(scope);
          scope.$digest();
          GridController = $controller('GridController', {
            $scope: scope
          });
          Grid = $injector.get('Grid');
        });
      });

      it('should expose some global scope', function(){
        scope.global.should.be.ok;
        scope.init.should.be.a.Function;
      });
      
      it('should init the controller with some values', function(){
        scope.init();
        (GridController.grid instanceof Grid).should.be.true;
      });

      after(function(){
        clearElementById('playerGrid');
        clearElementById('enemyGrid');
      });
    });
  });
})();
