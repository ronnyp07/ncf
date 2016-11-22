'use strinct';

var factura = angular.module('factura');
factura.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    //$urlRouterNcf.otherwise('not-found');

    // Home state routing
    $stateProvider
    .state('factura', {
       abstract: true,
       url: '/factura',
       template: '<ui-view/>'
    }).state('factura.list', {
        url: '',
        templateUrl: 'factura/views/factura.client.view.html',
        controller: 'FacturaController',
        controllerAs: 'vm'
    });
  }
]);