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
        module('bs.system', 'bs.grid', 'templates.html');
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
      
      it('should init the controller with some values', function(){
        (GridController.grid instanceof Grid).should.be.true;
      });

      after(function(){
        clearElementById('playerGrid');
        clearElementById('enemyGrid');
      });
    });
  });
})();
