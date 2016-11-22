'Use strict';

var provider = angular.module('provider');

provider.factory('ProviderServices', ['$resource',  function($resource){
    return $resource('api/provider');
}]);