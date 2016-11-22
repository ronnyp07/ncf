'Use strict';

var userModule = angular.module('user');
userModule.controller('UserController',['$scope', 'UserServiceRest', '$modal', 'NcfServiceRest', '$q',  function($scope, UserServiceRest, $modal, NcfServiceRest, $q){

  var vm = this;
  vm.userServices = UserServiceRest;
  vm.ncfServices = NcfServiceRest;
  vm.ncfServices.getMoneda().then(function(){
    vm.userServices.user.moneda = 2;
    vm.selectedMoneda = vm.ncfServices.getMonedaById(2);
    vm.userServices.user.tasa = vm.selectedMoneda.TASA;
  });

  vm.userInfo = {
    date: moment().format('DD/MM/YYYY'),
    user: 'rmorel',
    location: 'CAJA DE PUNTA CANA'
  };

  vm.ncfServices.getImpuestos().then(function(){
  });

  vm.ncfServices.getClient('INVERSIONES AZUL DEL ESTE DOM').then(function(data){
  });
  vm.userServices.producto.qt = 1;
  vm.userServices.producto.price = 0;
  vm.user = {};
  vm.product = {
    total : 0,
    subtotal: 0
  };
  vm.openForm = function () {
   vm.createModal = $modal({
     scope: $scope,
     'templateUrl': 'user/partials/user-template.tpl.html',
     show: true
   });
 };

//TODO: autogenerate this values
 vm.header = {
  company : 'BLUE TRAVEL',
  rnc: 130273251,
  address: 'ED.GYM 22. PTA CANA SHOP.MALL',
  phone: '(809)566-0092'
 };

 // vm.clientInfo = {
 //  client : '',
 //  rnc: 130273251,
 //  address: 'ED.GYM 22. PTA CANA SHOP.MALL'
 // };

 vm.orderInfo = {
  No : 'BLUE TRAVEL',
  user: 'Ronny Morel',
  date: moment().format('DD/MM/YYYY, h:mm a'),
  sucursal: 'CAJA DE PUNTA CANA'
 };

vm.setTasa = function(){
  vm.selectedMoneda = vm.ncfServices.getMonedaById(vm.userServices.user.moneda);
  vm.userServices.user.tasa = vm.selectedMoneda.TASA;
};

vm.createUser = function(){
  	 //TODO:
  	 //Get Value for field:
    vm.user.createBy = 'admin';
    vm.user.code = vm.user.codes.CODE.trim();
    vm.user.company = 1;
    vm.user.sucursal = 1;
    vm.user.activo = true;
    alertify.alert('Acción realizada exitosamente!!');

    console.log(vm.user);
    vm.userServices.create(vm.user).then(function(){
     alertify.success('Acción realizada exitosamente!!');
     vm.user = {};
     vm.createModal.hide();
   });
  };

  vm.editAppKey = function(field) {
    vm.product.Editvalue = field.quantity;
    vm.product.EditvaluePrices = field.cost;
    vm.userServices.tempSelectedproduct = field;
  };

  vm.getProductFilter = function(name){
    var defer = $q.defer();
      vm.ncfServices.searchProduct({name: name}).then(function(data){
          defer.resolve(data);
      });
    return defer.promise;
  };

  vm.selectedProductItem = function(item){
     if(_.isObject(item)){
        vm.userServices.producto.price = item.PRECIO;
      }
  };

  vm.resetPrice = function(){
    if(_.isObject(vm.userServices.producto)){
    vm.userServices.producto.price = 0;
    }
  };


  vm.saveOrder = function(){
       console.log(_.isObject(vm.userServices.user.client));
       vm.orderInfo.comment = vm.userServices.user.comment;
       vm.ncfServices.ncfAction(vm.userServices.ncfSelected.NCF_SUCURSAL_ID_PK).then(function(ncf){

       vm.order = {};
       //Todo: complete sucursalId
       vm.order.sucursalIdFk = 2;
       vm.order.clientIdFk = vm.noResults ? 86 : vm.userServices.user.client.CLIENTE_ID_PK;
       vm.order.clientIdentity = vm.noResults ? vm.userServices.user.client : vm.userServices.user.client.IDENTIFY;
       vm.order.subTotal = vm.product.total;
       vm.order.total = vm.product.subtotal;
       vm.order.itbis = vm.userServices.getTotalTax();
       vm.order.description = vm.userServices.user.comment;
       vm.order.moneda = vm.userServices.user.moneda;
       vm.order.activo = true;
       vm.order.caja = 1;
       vm.order.turno = 1;
       vm.order.ncf = ncf.secuence;
       vm.order.createBy = 'admin';
       vm.ncfServices.createOrder(vm.order).then(function(orderId){
         //vm.secuence = orderId.secuence;
         angular.forEach(vm.userServices.cart.items, function(item){
          console.log(item);
          var orderDetail = {};
          orderDetail.orderIdFk = orderId[0].param;
          orderDetail.productIdFk = item.code;
          orderDetail.productUserName = item.name;
          orderDetail.cantidad = item.quantity;
          orderDetail.precio = item.price;
          orderDetail.total = item.total;
          orderDetail.activo = true;
          orderDetail.createBy = 'Admin';
          vm.ncfServices.createDetail(orderDetail).then(function(){

          });
         });
         vm.userServices.printMode = true;
         vm.ncfServices.printReport();
          alertify.success('Acción realidada con exito');
         // vm.clearCart();
       });
   });
  };

 vm.saveFieldPrices = function(index, price){
    vm.userServices.updateItemPrice(index, price).then(function(items){
       vm.userServices.tempSelectedproduct = {};
       vm.setProductForm(vm.userServices.cart);
     });
  };

  vm.print = function(){
     vm.userServices.printMode = true;
  };

  vm.saveField = function(index, quantity){
     vm.userServices.updateItemQuantityByIndex(index, quantity).then(function(items){
       vm.setProductForm(vm.userServices.cart);
     });
  };

  vm.removeProduct = function(index){
    console.log(index);
    vm.userServices.removeFromCart(index).then(function(items){
    vm.setProductForm(vm.userServices.cart);
    });
  };

vm.addProduct = function(){
  //Todo agregar el Primary Id Default
   vm.userServices.producto.code = _.isObject(vm.userServices.producto.name) ? vm.userServices.producto.name.PRODUCT_ID_PK : 1;
   vm.userServices.producto.name = _.isObject(vm.userServices.producto.name) ? vm.userServices.producto.name.NAME : vm.userServices.producto.name;
  if(!vm.userServices.producto.name || !vm.userServices.producto.qt){
    alertify.error('La cantidad y el producto son requeridos!!');
  }else{
   vm.userServices.producto.price = vm.userServices.producto.price ? vm.userServices.producto.price : 0;
   vm.userServices.addToCart(vm.userServices.producto, vm.userServices.producto.qt).then(function(cart){
     vm.setProductForm(vm.userServices.cart);
     });
    }
 };


vm.clearCart = function(){
  vm.userServices.resetCart().then(function(data){
      vm.product.subtotal = 0;
      vm.product.total = 0;
      vm.userServices.user.moneda = 2;
      vm.selectedMoneda = vm.ncfServices.getMonedaById(2);
      vm.userServices.user.tasa = vm.selectedMoneda.TASA
      vm.userServices.user.impuestos = [];
      vm.userServices.ncfSelected = {};
      vm.userServices.user.client = null;
  });
};

 vm.taxeChange = function(tax, index){
  vm.userServices.setImpuestos(vm.ncfServices.impuestosList).then(function(){
     vm.product.subtotal = vm.userServices.getSubTotal(vm.userServices.cart.items);
     vm.product.total =  vm.product.subtotal + vm.userServices.getTotalTax();
  });
 };

 vm.setProductForm = function(cart){
     vm.userServices.producto = {};
     vm.userServices.producto.qt = 1;
     vm.taxeChange();
     vm.product.subtotal = vm.userServices.getSubTotal(cart.items);
     vm.product.total =  vm.product.subtotal + vm.userServices.getTotalTax();
 };

 vm.cancelForm = function() {
   vm.user = {};
   vm.createModal.hide();
 };
  // vm.userServices.
  // console.log('wor');


}]);