'use strict';

//languages service
angular.module('bs.lang').factory('Lang', ['$http', 'Global', function($http, Global){
  this.setLanguageTo = function(lang){
    lang = lang || this.defaultLanguage;
    if(!Global.lang || Global.lang.__lang !== lang){
      $http
        .get('/getLanguage/' + lang)
        .success(function(newLang){
          Global.lang = newLang;
        })
        .error(function(data, status){
          console.error('Error', status, ': Could not load language', lang);
        });
    }
  };
  
  if(!this.defaultLanguage){
    var navigatorLanguage = navigator.language || navigator.userLanguage || navigator.systemLanguage;
    this.defaultLanguage = (/^en/.test(navigatorLanguage)) ? 'en' : 'fr';
    this.setLanguageTo(this.defaultLanguage);
  }
  
  return this;
}]);
