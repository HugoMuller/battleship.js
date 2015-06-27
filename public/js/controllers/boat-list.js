'use strict';

angular.module('bs.system').controller('BoatListController', ['$scope', 'Global', function($scope, Global){
  $scope.global = Global;
  $scope.boats = [
    { type: 'aircraft_carrier', size: 5, offset: 0 },
    { type: 'battleship',       size: 4, offset: 5 },
    { type: 'submarine',        size: 3, offset: 9 },
    { type: 'cruiser',          size: 3, offset: 12 },
    { type: 'destroyer',        size: 2, offset: 15 }
  ];
  $scope.pathToImg = '/img/boats/';
  
  $scope.rotateBoat = function(canvasId){
    var canvas = document.getElementById(canvasId);
    var img = new Image();
    img.src = canvas.toDataURL();
    var context = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    canvas.width = h;
    canvas.height = w;
    context.translate(h, 0);
    context.rotate(Math.PI / 2);
    context.drawImage(img, 0, 0);
    var direction = canvas.getAttribute('boat-direction');
    direction = (direction === 'horizontal') ? 'vertical' : 'horizontal';
    canvas.setAttribute('boat-direction', direction);
  };
}]);
