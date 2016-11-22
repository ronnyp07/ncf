'use strinct';

var provider = angular.module('provider');
provider.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    //$urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
    .state('provider', {
       abstract: true,
       url: '/provider',
       template: '<ui-view/>'
    }).state('provider.list', {
        url: '',
        templateUrl: 'provider/views/provider.client.view.html',
    });
    // .state('not-found', {
    //   url: '/not-found',
    //   templateUrl: '/provider/views/404.client.view.html'
    // });
  }
]);