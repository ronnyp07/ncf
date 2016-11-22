'use strinct';

var core = angular.module('core');
core.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
    .state('home', {
       url: '/',
       templateUrl: 'core/views/core.client.view.html'
    })
    // .state('home.list', {
    //     url: '',
    //     templateUrl: 'core/views/core.client.view.html',
    // }).state('home.print', {
    //   url:'/print',
    //   templateUrl: 'factura/partials/print.html'
    // });
    .state('not-found', {
      url: '/not-found',
      templateUrl: '/core/views/404.client.view.html'
    });
  }
]);