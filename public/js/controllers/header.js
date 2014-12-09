'use strict';

angular.module('bs.system').controller('HeaderController', ['$scope', 'Global', 'Lang', function($scope, Global, Lang){
  $scope.global = Global;
  $scope.isCollapsed = false;
  $scope.setLanguageTo = Lang.setLanguageTo.bind(Lang);
}]);
