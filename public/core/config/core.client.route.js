'use strinct';

var core = angular.module('core');
core.config(['$statecore', '$urlRoutercore',
  function ($statecore, $urlRoutercore) {

    // Redirect to 404 when route not found
    //$urlRoutercore.otherwise('not-found');

    // Home state routing
    $statecore
    .state('home', {
       abstract: true,
       url: '/',
       template: '<ui-view/>'
    }).state('home.list', {
        url: '',
        templateUrl: 'core/views/core.client.view.html',
    }).state('home.print', {
      url:'/print',
      templateUrl: 'factura/partials/print.html'
    });
    // .state('not-found', {
    //   url: '/not-found',
    //   templateUrl: '/core/views/404.client.view.html'
    // });
  }
]);