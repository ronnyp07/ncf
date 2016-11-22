'Use strict';

var factura = angular.module('factura');

factura.factory('FacturaServices', ['$resource',  function($resource){
	return $resource('api/factura');
}]);


factura.service('FacturaServiceRest', [ '$http','$q', 'toaster', function($http, $q, toaster){
	var self = {
		'facturaList': [],
		'facturaTypeList': [],
		'factura': {},
		'cart': {
			client: {_id: 'default', name: 'Consumidor Final', address: ''},
			items:[],
			subtotal: 0,
			impuestos: [],
			tax: 0
		},
		'producto': {},
		'productList': [],
		'ncfSelected': {},
		'tempSelectedproduct': {},
   'removeFromCart': function(index){
	 var defer = $q.defer();
      self.cart.items.splice(index, 1);
      defer.resolve(self.cart.items);
      return defer.promise;
  }, getSubTotal: function (items) {
  var subtotal = 0;
  if (items) {
    _.forEach(items, function (item) {
      var itemValue = item.price;
      subtotal = subtotal + (Number(item.quantity) * Number(itemValue));
    });
  }
  return subtotal;
 },'updateItemPrice': function(index, price){
     var defer = $q.defer();
     self.cart.items[index].price = Number(price);
     self.cart.items[index].total = Number(self.cart.items[index].quantity) * Number(self.cart.items[index].price);
     defer.resolve(self.cart.items);
     return defer.promise;
   },'updateItemQuantityByIndex' : function(index, quantity){
     var defer = $q.defer();
     self.cart.items[index].quantity = Number(quantity);
     self.cart.items[index].total = Number(self.cart.items[index].quantity) *  Number(self.state === 'compra' ? self.cart.items[index].cost : self.cart.items[index].price);
     defer.resolve(self.cart.items);
     return defer.promise;

  },setImpuestos: function(impuestos){
  	var defer = $q.defer();
  	self.cart.impuestos= [];
  _.forIn(self.factura.impuestos, function(value, key) {
     var impuesto = _.find(impuestos, { 'NAME': key});
      if(value){
        impuesto.taxsub = self.getSubTotal(self.cart.items) * (impuesto.VALUE/100);
        self.cart.impuestos.push(impuesto);
        // tax  += Number(impuesto.VALUE);
      }
    });

     defer.resolve();
     return defer.promise;
  },'resetCart': function(){
   var defer = $q.defer();
   self.cart = {
   	client: 'default',
    items:[],
	subtotal: 0,
	impuestos: [],
	tax: 0
   };
   defer.resolve();
   return defer.promise;
   },getTotalTax : function(tax) {
   var subtotal = 0;
   if(self.cart.impuestos) {
    _.forEach(self.cart.impuestos, function (item) {
      subtotal += Number(item.taxsub);
    });
   }
  return subtotal;

  },'addToCart': function(item, qt){
  	var defer = $q.defer();
  	if(!self.cart.items){
  		self.cart.items = [];
  	}
  	var itemIndex = _.findIndex(self.cart.items, function(o) { return o.name === item.name; });
  	if(itemIndex >=0){
  		self.cart.items[itemIndex].quantity = Number(qt) ? self.cart.items[itemIndex].quantity + Number(qt) : 1;
  		self.cart.items[itemIndex].price = Number(item.price);
  		self.cart.items[itemIndex].total = Number(self.cart.items[itemIndex].quantity) * Number(self.state === 'compra' ? self.cart.items[itemIndex].price : self.cart.items[itemIndex].price);
  	}else{
  		item.quantity = qt;
  		item.price = Number(item.price);
  		item.total = Number(item.quantity) * Number(self.state === 'compra' ? item.price : item.price);
  		self.cart.items.push(item);
  	}
  	defer.resolve(self.cart);
            return defer.promise; // return the promise for further handling
     },'create': function(factura){
        	var defer = $q.defer();
        	self.isSaving = true;
        	$http.post('api/factura', factura).
        	success(function(data){
        		toaster.pop('success', 'Guardado');
        		defer.resolve(data);
        	}).
        	error(function(err, status){
        		defer.reject(err);
        		console.log(status);
        	});

        	return defer.promise;
        }, facturaSearch: function(param){
        	var defer = $q.defer(),
        	query = {valido: true},
        	result = [];

        	$http.get('api/factura', {params: {valido:true}}).success(function(data){
        		if(data.length > 0){
        			angular.forEach(data, function(res) {
        				self.facturaList.push(res);
        			});
        		}
        		defer.resolve(self.facturaList);
        	}).error(function(){
        		defer.reject(err);
        		console.log();
        	});

        	return defer.promise;
        },getFacturaTypes: function(param){
        	var defer = $q.defer(),
        	result = [];

        	$http.get('api/facturaTypes').success(function(data){
        		if(data.length > 0){
        			angular.forEach(data, function(res) {
        				self.facturaTypeList.push(res);
        			});
        		}
        		defer.resolve(self.facturaTypeList);
        	}).error(function(err){
        		defer.reject(err);
        		console.log(err);
        	});
        	return defer.promise;
        }
    };
   // self.facturaSearch();
   return self;
}]);