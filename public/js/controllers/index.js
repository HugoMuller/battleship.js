'use strict';

angular.module('bs.system').controller('IndexController', ['$scope', 'Global', '$location', function ($scope, Global) {
  $scope.global = Global;
}]);