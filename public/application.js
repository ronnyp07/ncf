'use strinct';

var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module('mean',
	[
	 'ngResource',
	 'ngAnimate',
	 'mgcrea.ngStrap',
	 'ui.router',
	 'ui.bootstrap',
	 'angularFileUpload',
     'angular-cache',
     'ui.utils.masks',
     'ngAria',
     'ui.mask',
     'ngBootbox',
     'ngMaterial',
     'oi.select',
     'angularUtils.directives.dirPagination',
     'infinite-scroll',
     'core',
	 'provider',
	 'ncf',
	 'factura',
	 'toaster',
	 'user'

	 // 'ngRoute',
	 // 'users',
	 // 'example',
	 // 'patients',
	 // 'pais',
	 // 'sector',
	 // 'ciudad',
	 // 'ui.select2',
	 // 'ui.bootstrap',
	 // 'ngTable',
	 // 'clientes',
	 // 'tempresult',
	 // 'procs',
	 // 'ngLodash',
	 // 'doctor',
	 // 'orders',
	 // 'cierre',
	 // 'index',
	 // 'oi.select',
	 // 'headermasters',
	 // 'maintains',
	 // 'locations',
	 // 'ngMaterial',
	 // 'ui.date',
	 // 'angularUtils.directives.dirPagination',
	 // 'daterangepicker',
	 // 'ui.calendar',
	 // 'angular-ladda',
	 // 'ngLodash'
	 ]);

// mainApplicationModule.config(['$locationProvider', 'laddaProvider',
//  function($locationProvider, laddaProvider){
// 	$locationProvider.hashPrefix('!');

// 	laddaProvider.setOption({
// 		style: 'expand-right'
// 	});
// }
// ]);

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});