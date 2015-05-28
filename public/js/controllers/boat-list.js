'use strict';

angular.module('bs.system').controller('BoatListController', ['$scope', 'Global', function($scope, Global){
  $scope.global = Global;
  $scope.boats = [
    { type: 'aircraft_carrier', size: 5 },
    { type: 'battleship',       size: 4 },
    { type: 'submarine',        size: 3 },
    { type: 'cruiser',          size: 3 },
    { type: 'destroyer',        size: 2 }
  ];
  $scope.pathToImg = '/img/boats/';
}]);
