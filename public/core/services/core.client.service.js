'Use strict';

var core = angular.module('core');

core.factory('coreServices', ['$resource',  function($resource){
    return $resource('api/core');
}]);