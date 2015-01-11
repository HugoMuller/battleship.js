'use strict';

angular.module('bs.system').controller('IndexController', ['$scope', 'Global', function($scope, Global){
  $scope.global = Global;
}]);
