'Use strict';

var facturaModule = angular.module('factura');
facturaModule.controller('FacturaController',['$scope', 'FacturaServiceRest', '$modal', 'NcfServiceRest', '$q', 'Authentication','Notify',  function($scope, FacturaServiceRest, $modal, NcfServiceRest, $q, Authentication, Notify){

  var vm = this;
  vm.facturaServices = FacturaServiceRest;
  vm.ncfServices = NcfServiceRest;
  vm.ncfServices.getMoneda().then(function(){
    vm.facturaServices.factura.moneda = 2;
    vm.selectedMoneda = vm.ncfServices.getMonedaById(2);
    vm.facturaServices.factura.tasa = vm.selectedMoneda.TASA;
  });

  vm.authentication = Authentication;
  console.log(vm.authentication.user.USER_ID_PK);


  vm.userInfo = {
    date: moment().format('DD/MM/YYYY'),
    user: 'rmorel',
    location: 'CAJA DE PUNTA CANA'
  };

  vm.ncfServices.getImpuestos().then(function(){
  });

  vm.ncfServices.getClient('INVERSIONES AZUL DEL ESTE DOM').then(function(data){
  });
  vm.facturaServices.producto.qt = 1;
  vm.facturaServices.producto.price = 0;
  vm.factura = {};
  vm.product = {
    total : 0,
    subtotal: 0
  };
  vm.openForm = function () {
   vm.createModal = $modal({
     scope: $scope,
     'templateUrl': 'factura/partials/factura-template.tpl.html',
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
  vm.selectedMoneda = vm.ncfServices.getMonedaById(vm.facturaServices.factura.moneda);
  vm.facturaServices.factura.tasa = vm.selectedMoneda.TASA;
};

vm.createFactura = function(){
  	 //TODO:
  	 //Get Value for field:
    vm.factura.createBy = 'admin';
    vm.factura.code = vm.factura.codes.CODE.trim();
    vm.factura.company = 1;
    vm.factura.sucursal = 1;
    vm.factura.activo = true;
    alertify.alert('Acción realizada exitosamente!!');

    console.log(vm.factura);
    vm.facturaServices.create(vm.factura).then(function(){
     alertify.success('Acción realizada exitosamente!!');
     vm.factura = {};
     vm.createModal.hide();
   });
  };

  vm.editAppKey = function(field) {
    vm.product.Editvalue = field.quantity;
    vm.product.EditvaluePrices = field.cost;
    vm.facturaServices.tempSelectedproduct = field;
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
        vm.facturaServices.producto.price = item.PRECIO;
      }
  };

  vm.resetPrice = function(){
    if(_.isObject(vm.facturaServices.producto)){
    vm.facturaServices.producto.price = 0;
    }
  };


  vm.saveOrder = function(){
       console.log(_.isObject(vm.facturaServices.factura.client));
       vm.orderInfo.comment = vm.facturaServices.factura.comment;
       vm.ncfServices.ncfAction(vm.facturaServices.ncfSelected.NCF_SUCURSAL_ID_PK).then(function(ncf){

       vm.order = {};
       //Todo: complete sucursalId
       vm.order.sucursalIdFk = 2;
       vm.order.clientIdFk = vm.noResults ? 86 : vm.facturaServices.factura.client.CLIENTE_ID_PK;
       vm.order.clientIdentity = vm.noResults ? vm.facturaServices.factura.client : vm.facturaServices.factura.client.IDENTIFY;
       vm.order.subTotal = vm.product.subtotal;
       vm.order.total = vm.product.total;
       vm.order.itbis = vm.facturaServices.getTotalTax();
       vm.order.description = vm.facturaServices.factura.comment;
       vm.order.moneda = vm.facturaServices.factura.moneda;
       vm.order.activo = true;
       vm.order.caja = 1;
       vm.order.turno = 1;
       vm.order.ncf = ncf.secuence;
       vm.order.createBy = 'admin';
       vm.ncfServices.createOrder(vm.order).then(function(orderId){
         //vm.secuence = orderId.secuence;
         angular.forEach(vm.facturaServices.cart.items, function(item){
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
          vm.ncfServices.printMode = true;
          vm.ncfServices.printReport();
         // alertify.success('Acción realidada con exito');
         // vm.clearCart();
       });
   });
  };

 Notify.getMsg('afterPrint', function(event, data){
   console.log('recive message');
   $state.go('factura');
   vm.clearCart();
 });

 vm.afterPrint = function(){
  //console.log('print');
   vm.ncfServices.printMode = false;
   vm.clearCart();
 };

 vm.saveFieldPrices = function(index, price){
    vm.facturaServices.updateItemPrice(index, price).then(function(items){
       vm.facturaServices.tempSelectedproduct = {};
       vm.setProductForm(vm.facturaServices.cart);
     });
  };

  vm.print = function(){
     vm.facturaServices.printMode = true;
  };

  vm.saveField = function(index, quantity){
     vm.facturaServices.updateItemQuantityByIndex(index, quantity).then(function(items){
       vm.setProductForm(vm.facturaServices.cart);
     });
  };

  vm.removeProduct = function(index){
    console.log(index);
    vm.facturaServices.removeFromCart(index).then(function(items){
    vm.setProductForm(vm.facturaServices.cart);
    });
  };

vm.addProduct = function(){
  //Todo agregar el Primary Id Default
   vm.facturaServices.producto.code = _.isObject(vm.facturaServices.producto.name) ? vm.facturaServices.producto.name.PRODUCT_ID_PK : 1;
   vm.facturaServices.producto.name = _.isObject(vm.facturaServices.producto.name) ? vm.facturaServices.producto.name.NAME : vm.facturaServices.producto.name;
  if(!vm.facturaServices.producto.name || !vm.facturaServices.producto.qt){
    alertify.error('La cantidad y el producto son requeridos!!');
  }else{
   vm.facturaServices.producto.price = vm.facturaServices.producto.price ? vm.facturaServices.producto.price : 0;
   vm.facturaServices.addToCart(vm.facturaServices.producto, vm.facturaServices.producto.qt).then(function(cart){
     vm.setProductForm(vm.facturaServices.cart);
     });
    }
 };


vm.clearCart = function(){
  vm.facturaServices.resetCart().then(function(data){
      vm.product.subtotal = 0;
      vm.product.total = 0;
      vm.facturaServices.factura.moneda = 2;
      vm.order = {};
      vm.selectedMoneda = vm.ncfServices.getMonedaById(2);
      vm.facturaServices.factura.tasa = vm.selectedMoneda.TASA
      vm.facturaServices.factura.impuestos = [];
      vm.facturaServices.ncfSelected = {};
      vm.facturaServices.factura.client = null;
  });
};

 vm.taxeChange = function(tax, index){
  vm.facturaServices.setImpuestos(vm.ncfServices.impuestosList).then(function(){
     vm.product.subtotal = vm.facturaServices.getSubTotal(vm.facturaServices.cart.items);
     vm.product.total =  vm.product.subtotal + vm.facturaServices.getTotalTax();
  });
 };

 vm.setProductForm = function(cart){
     vm.facturaServices.producto = {};
     vm.facturaServices.producto.qt = 1;
     vm.taxeChange();
     vm.product.subtotal = vm.facturaServices.getSubTotal(cart.items);
     vm.product.total =  vm.product.subtotal + vm.facturaServices.getTotalTax();
 };

 vm.cancelForm = function() {
   vm.factura = {};
   vm.createModal.hide();
 };
  // vm.facturaServices.
  // console.log('wor');


}]);