'use strict';

(function(){
  describe('BattleShip services', function(){
    describe('Factory Timer', function(){
      var timer;
      var $timeout;
      var $interval;

      beforeEach(function(){
        module('bs.timer');
        inject(function($injector, _$timeout_, _$interval_){
          timer = $injector.get('Timer');
          $timeout = _$timeout_;
          $interval = _$interval_;
        });
      });

      describe('Methods start and stop', function(){
        it('should start the timer', function(){
          this.timeout(3100);
          
          timer.timeElapsed.should.equal(0);
          (timer.timerId === undefined).should.be.true;
          
          timer.start();
          
          $timeout(function(){
            should.exist(timer.timerId);
            timer.timeElapsed.should.equal(3);
            
            timer.stop();
            should.not.exist(timer.timerId);
          }, 3000);
          
          $interval.flush(3000);
          $timeout.flush(3000);
        });
      });

      afterEach(function(){
        //Verifies that there are no pending tasks that need to be flushed
        $timeout.verifyNoPendingTasks();
      });
    });
  });
})();
