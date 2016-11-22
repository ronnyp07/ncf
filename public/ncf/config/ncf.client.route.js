'use strinct';

var ncf = angular.module('ncf');
ncf.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    //$urlRouterNcf.otherwise('not-found');

    // Home state routing
    $stateProvider
    .state('ncf', {
       abstract: true,
       url: '/ncf',
       template: '<ui-view/>'
    }).state('ncf.list', {
        url: '',
        templateUrl: 'ncf/views/ncf.client.view.html',
        controller: 'NcfController',
        controllerAs: 'vm'
    }).state('ncf.print', {
        url: '/print',
        templateUrl: 'ncf/partials/print.html',
        controller: 'NcfController',
        controllerAs: 'vm'
    });
  }
]);