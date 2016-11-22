'Use strict';

var ncfModule = angular.module('ncf');
ncfModule.controller('NcfController',['$scope', 'NcfServiceRest', '$modal',  function($scope, NcfServiceRest, $modal){

  var vm = this;
  vm.ncfServices = NcfServiceRest;
  vm.ncfServices.ncfSearch();
  vm.ncf = {};
  vm.openForm = function () {
   vm.createModal = $modal({
   scope: $scope,
   'templateUrl': 'ncf/partials/ncf-template.tpl.html',
      show: true
   });
  };

  vm.createNcf = function(){
  	 //TODO:
  	 //Get Value for field:
  	  vm.ncf.createBy = 'admin';
  	  vm.ncf.code = vm.ncf.codes.CODE.trim();
      vm.ncf.company = 1;
      vm.ncf.sucursal = 1;
      vm.ncf.activo = true;
       alertify.alert('Acción realizada exitosamente!!');

      console.log(vm.ncf);
      vm.ncfServices.create(vm.ncf).then(function(){
             alertify.success('Acción realizada exitosamente!!');
             vm.ncf = {};
             vm.createModal.hide();
       });
  };

  vm.cancelForm = function() {
  	vm.ncf = {};
  	vm.createModal.hide();
  };
  // vm.ncfServices.
  // console.log('wor');
}]);


ncfModule.controller('NcfPrint',['$scope', 'NcfServiceRest', '$modal', '$q', '$timeout', function($scope, NcfServiceRest, $modal, $q, $timeout){
    vm  = this;


vm.printReport = function(){
  vm.isPrinting = true;
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
};

    vm.printInfo = {
      client : "Ronny Morel",
      rnc: "0011784590",
      dir: "Santo Domingo Republica Dominicana"
    };

    vm.productList = [{
      cant : 1,
      des: 'platano',
      sub: 100,
      total: 150
    },{
      cant : 1,
      des: 'platano',
      sub: 100,
      total: 150
    },{
      cant : 1,
      des: 'platano',
      sub: 100,
      total: 150
    },{
      cant : 1,
      des: 'platano',
      sub: 100,
      total: 150
    }];

}]);