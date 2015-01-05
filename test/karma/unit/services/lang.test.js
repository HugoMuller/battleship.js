'use strict';

(function(){
  describe('BattleShip services', function(){
    describe('Factory Lang', function(){
      var Global;
      var Lang;
      var $httpBackend;
      var $timeout;
      var languageEN = 'en';
      var languageFR = 'fr';
      var navigatorLanguage = navigator.language || navigator.userLanguage || navigator.systemLanguage;
      var defaultLanguage = (/^en/.test(navigatorLanguage)) ? languageEN : languageFR;
      var expected = { __lang: defaultLanguage };

      beforeEach(function(){
        module('bs.system', 'bs.lang');
        inject(function($injector, _$httpBackend_, _$timeout_){
          $httpBackend = _$httpBackend_;
          $timeout = _$timeout_;
          Global = $injector.get('Global');
        });
      });
      
      describe('Invocation', function(){
        it('should invoke the Lang factory and download once the default language of the browser', function(done){
          inject(function($injector){
            $httpBackend
              .expectGET('/getLanguage/'+defaultLanguage)
              .respond(200, expected);

            Lang = $injector.get('Lang');
            $httpBackend.flush();
            
            $timeout(function(){
              should.exist(Global.lang);
              Global.lang.should.be.eql(expected);
              
              $httpBackend
                .whenGET('/getLanguage/'+defaultLanguage)
                .respond(500, { error: 'this should not be sent'});

              Lang.setLanguageTo(defaultLanguage);
              $httpBackend.flush.should.throw();
              
              $timeout(function(){
                should.exist(Global.lang);
                should.not.exist(Global.lang.error);
                Global.lang.should.be.eql(expected);
                done();
              }, 200);
              
              $timeout.flush(200);
            }, 200);

            $timeout.flush(200);
          });
        });
      });
      
      describe('Method setLanguageTo', function(){
        it('should invoke the Lang factory and download another language', function(done){
          inject(function($injector){
            var newLanguage = (defaultLanguage === languageFR) ? languageEN : languageFR;
            var newExpected = { __lang: newLanguage };

            $httpBackend
              .whenGET('/getLanguage/'+defaultLanguage)
              .respond(500, { error: 'this should not be sent'});

            Lang = $injector.get('Lang');
            $httpBackend.flush.should.throw();

            $timeout(function(){
              should.exist(Global.lang);
              should.not.exist(Global.lang.error);
              Global.lang.should.be.eql(expected);
              
              $httpBackend
                .expectGET('/getLanguage/'+newLanguage)
                .respond(200, newExpected);

              Lang.setLanguageTo(newLanguage);
              $httpBackend.flush();

              $timeout(function(){
                should.exist(Global.lang);
                Global.lang.should.be.eql(newExpected);
                done();
              }, 200);

              $timeout.flush(200);
            }, 200);

            $timeout.flush(200);
          });
        });
      });
      
      afterEach(function(){
        //Verifies that there are no pending tasks that need to be flushed
        $timeout.verifyNoPendingTasks();
        //Verifies that all of the requests defined via the expect api were made
        $httpBackend.verifyNoOutstandingExpectation();
        //Verifies that there are no outstanding requests that need to be flushed
        $httpBackend.verifyNoOutstandingRequest();
      });
    });
  });
})();
