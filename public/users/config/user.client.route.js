'use strinct';

var user = angular.module('user');
user.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    //$urlRouterNcf.otherwise('not-found');

    // Home state routing
    $stateProvider
    .state('user', {
       abstract: true,
       url: '/user',
       template: '<ui-view/>'
    }).state('user.list', {
        url: '',
        templateUrl: 'user/views/user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm'
    });
  }
]);