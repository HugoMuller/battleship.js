'use strict';

angular.module('bs').directive('initBoatCanvas', ['Global', function(Global){
  return function(scope, element, attrs){
    var canvas = element[0];
    canvas.setAttribute('width', scope.boat.size*Global.tileSize);
    canvas.setAttribute('height', Global.tileSize);
    var context = canvas.getContext('2d');
    var img = new Image();
    img.src = '/img/boats/boats.png';
    img.onload = function(){
      var width = scope.boat.size*Global.tileSize;
      var height = Global.tileSize;
      context.drawImage(this, scope.boat.offset*Global.tileSize, 0, width, height, 0, 0, width, height);
    };
  };
}]);
