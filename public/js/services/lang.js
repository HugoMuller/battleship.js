'use strict';

//languages service
angular.module('bs.lang').factory('Lang', ['$http', 'Global', function($http, Global){
  this.downloadLanguage = function(lang){
    console.log('>>>>send request', lang);
    $http
      .get('/getLanguage/' + lang)
      .success(function(newLang){
        Global.lang = newLang;
      })
      .error(function(data, status){
        console.error('Error', status, ': Could not load language', lang);
      });
  };

  this.setLanguageTo = function(lang){
    console.log('call setLanguageTo('+lang+')');
    lang = lang || 'en';
    if(!Global.lang || Global.lang.__lang !== lang){
      this.downloadLanguage(lang);
    }
  };
  
  var navigatorLanguage = navigator.language || navigator.userLanguage || navigator.systemLanguage;
  var defaultLanguage = (/^en/.test(navigatorLanguage)) ? 'en' : 'fr';
  this.setLanguageTo(defaultLanguage);

  return this;
}]);
