'Use strict';

var ncf = angular.module('ncf');

ncf.factory('NcfServices', ['$resource',  function($resource){
	return $resource('api/ncf');
}]);


ncf.service('NcfServiceRest', [ '$http','$q', 'toaster', '$timeout', function($http, $q, toaster, $timeout){

	var self = {
		'ncfList': [],
		'ncfTypeList': [],
		'selectedTasa': {},
		'monedaList': [],
		'impuestosList': [],
		'create': function(ncf){
			var defer = $q.defer();
			self.isSaving = true;
			$http.post('api/ncf', ncf).
			success(function(data){
				toaster.pop('success', 'Guardado');
				defer.resolve(data);
			}).
			error(function(err, status){
				defer.reject(err);
				console.log(status);
			});

			return defer.promise;
		},'createOrder': function(ncf){
			var defer = $q.defer();
			self.isSaving = true;
			$http.post('api/order', ncf).
			success(function(data){
				defer.resolve(data);
			}).
			error(function(err, status){
				defer.reject(err);
				console.log(status);
			});

			return defer.promise;

		},'ncfAction': function(ncf){
			var defer = $q.defer();
			console.log(ncf);
			self.isSaving = true;
			$http.post('api/ncfAction',{ncfIdPk: ncf}).
			success(function(data){
				defer.resolve(data);
			}).
			error(function(err, status){
				defer.reject(err);
				console.log(status);
			});

			return defer.promise;
		},'createDetail': function(ncf){
			var defer = $q.defer();
			self.isSaving = true;
			$http.post('api/createDetails', ncf).
			success(function(data){
				defer.resolve(data);
			}).
			error(function(err, status){
				defer.reject(err);
				console.log(status);
			});

			return defer.promise;
		},'searchProduct': function(product){
			var defer = $q.defer();
			self.isSaving = true;
			$http.post('/api/productSearch', product).
			success(function(data){
				defer.resolve(data);
			}).
			error(function(err, status){
				defer.reject(err);
				console.log(status);
			});

			return defer.promise;
		},ncfSearch: function(param){
			var defer = $q.defer(),
			query = {valido: true};
			self.ncfList = [];

			$http.get('api/ncf', {params: {valido:true}}).success(function(data){
				if(data.length > 0){
					angular.forEach(data, function(res) {
						self.ncfList.push(res);
					});
				}
				defer.resolve(self.ncfList);
			}).error(function(){
				defer.reject(err);
				console.log();
			});

			return defer.promise;
		},'printReport' : function(){
			var defer = $q.defer();
			$timeout(function(){
				var printSection = document.getElementById('printSection');
				var ticketContainer = document.getElementById('ticketContainer');
				function printElement(elem) {
					printSection.innerHTML = '';
					printSection.appendChild(elem);
					window.print();
				}
				if (!printSection) {
					printSection = document.createElement('div');
					printSection.id = 'printSection';
					document.body.appendChild(printSection);
				}
                //var target =  angular.element(document.querySelector('#printThisElement'));
                var elemToPrint = document.getElementById("printThisElement");
                if (elemToPrint) {
                	printElement(elemToPrint);
                }
            }, 2000);
			return defer.promise;
		},getNcfTypes: function(param){
			var defer = $q.defer(),
			result = [];
			self.ncfTypeList = [];

			$http.get('api/ncfTypes').success(function(data){
				if(data.length > 0){
					angular.forEach(data, function(res) {
						self.ncfTypeList.push(res);
					});
				}
				defer.resolve(self.ncfTypeList);
			}).error(function(err){
				defer.reject(err);
				console.log(err);
			});
			return defer.promise;
		},getMonedaById: function(id){
			if(self.monedaList.length > 0){
				var index = _.findIndex(self.monedaList, function(o) { return o.MONEDA_ID_PK == id; });
				return self.monedaList[index];
			}
		},getMoneda: function(param){
			var defer = $q.defer(),
			query = {
				MONEDA_ID_PK: param
			},
			result = [];
			self.monedaList = [];

			$http.get('api/moneda').success(function(data){
				if(data.length > 0){
					angular.forEach(data, function(res) {
						self.monedaList.push(res);
					});
				}
				defer.resolve(self.monedaList);
			}).error(function(err){
				defer.reject(err);
				console.log(err);
			});
			return defer.promise;

		},getClient: function(param){
			var defer = $q.defer(),
			query = {
				client: param
			},
			result = [];

			$http.get('api/clientGet', {params: { client: param}}).success(function(data){
				if(data.length > 0){
					angular.forEach(data, function(res) {
						result.push(res);
					});
				}
				defer.resolve(result);
			}).error(function(err){
				defer.reject(err);
				console.log(err);
			});
			return defer.promise;
		},getImpuestos: function(param){
			var defer = $q.defer();
		    self.impuestosList = [];
			$http.get('api/impuestos').success(function(data){
				if(data.length > 0){
					angular.forEach(data, function(res) {
						self.impuestosList.push(res);
					});
				}
				defer.resolve(self.impuestosList);
			}).error(function(err){
				defer.reject(err);
				console.log(err);
			});
			return defer.promise;
		}

	};
    //self.ncfSearch();
    return self;
}]);