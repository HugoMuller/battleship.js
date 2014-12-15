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
      var expectedFR = { __lang: languageFR };
      var expectedEN = { __lang: languageEN };

      beforeEach(function(){
        module('bs.system', 'bs.lang');
        inject(function($injector, _$httpBackend_, _$timeout_){
          $httpBackend = _$httpBackend_;
          $timeout = _$timeout_;

          $httpBackend
            .whenGET('/getLanguage/'+languageFR)
            .respond(200, expectedFR);
          $httpBackend
            .whenGET('/getLanguage/'+languageEN)
            .respond(200, expectedEN);

          if(Global === undefined) Global = $injector.get('Global');
        });
      });
      
      describe('Invocation', function(){
        it('should invoke the Lang factory and download the default language of the browser', inject(function($injector){
          $httpBackend
            .expectGET('/getLanguage/'+defaultLanguage)
            .respond(200, expected);
          
          Lang = $injector.get('Lang');
          
          $timeout(function(){
            should.exist(Global.lang);
            Global.lang.should.be.eql(expected);
          }, 200);
          
          //Flushes all pending requests
          $httpBackend.flush();
        }));
      });
      
      describe('Method setLanguageTo', function(){
        it('should not send an HTTP GET as the requested language is the actual applied language', inject(function($injector){
          $httpBackend
            .expectGET('/getLanguage/'+defaultLanguage)
            .respond(200, expected);
          
          Lang = $injector.get('Lang');

          $timeout(function(){
            should.exist(Global.lang);
            Global.lang.should.be.eql(expected);

            $httpBackend
              .whenGET('/getLanguage/'+defaultLanguage)
              .respond(500, { error: 'this should not be sent'});

            Lang.setLanguageTo(defaultLanguage);
            
            $timeout(function(){
              should.exist(Global.lang);
              should.not.exist(Global.lang.error);
              Global.lang.should.be.eql(expected);
            }, 200);
          }, 200);
          
          //Flushes all pending requests
          $httpBackend.flush();
        }));
        
        it('should download another language', inject(function($injector){
          var nLanguage;
          var nExpected;
          if(defaultLanguage === languageEN){
            nLanguage = languageFR;
            nExpected = expectedFR;
          }else{
            nLanguage = languageEN;
            nExpected = expectedEN;
          }
          $httpBackend
            .expectGET('/getLanguage/'+defaultLanguage)
            .respond(200, expected);

          Lang = $injector.get('Lang');
          $timeout(function(){
            should.exist(Global.lang);
            Global.lang.should.be.eql(expected);
            
            $httpBackend
              .expectGET('/getLanguage/'+nLanguage)
              .respond(200, nExpected);
            
            Lang.setLanguageTo(nLanguage);
            
            $timeout(function(){
              should.exist(Global.lang);
              Global.lang.should.be.eql(nExpected);
            }, 200);
          }, 200);

          $timeout.flush();
          //Flushes all pending requests
          $httpBackend.flush();
        }));
      });
      
      afterEach(function(){
        //Verifies that all of the requests defined via the expect api were made
        $httpBackend.verifyNoOutstandingExpectation();
        //Verifies that there are no outstanding requests that need to be flushed
        $httpBackend.verifyNoOutstandingRequest();
      });
    });
  });
})();
