var sql = require('mssql');

module.exports = function(db){
var self = {
   create: function(req, res, next){
       console.log(req.body);
    	var request = new sql.Request(db);
    	request.input('SUCURSAL_ID_FK', sql.Int, req.body.sucursalIdFk);
    	request.input('CLIENT_ID_FK', sql.Int, req.body.clientIdFk);
      request.input('CLIENT_IDENTITY', sql.VarChar(20), req.body.clientIdentity);
      request.input('SUB_TOTAL', sql.Decimal(10,6), req.body.subTotal);
      request.input('TOTAL', sql.Decimal(10,6), req.body.total);
      request.input('ITBIS', sql.Decimal(10,6), req.body.itbis);
      request.input('DESCRIPTION', sql.VarChar(200), req.body.description);
      request.input('MONEDA', sql.Int, req.body.moneda);
      request.input('ACTIVO', sql.Bit, req.body.activo);
      request.input('CAJA', sql.Int, req.body.caja);
      request.input('TURNO', sql.Int, req.body.turno);
      request.input('NCF', sql.VarChar(19), req.body.ncf);
      request.input('CREATED_BY', sql.VarChar(50), req.body.createBy);
      request.execute('ORDER_INSERT', function(err, recordsets, returnValue, affected) {
    		console.log(err);
        console.log(recordsets);
        console.log(returnValue);
    		var result = recordsets[0];
    		res.json(result);
     });
    }, createDetails: function(req, res, next){
      var request = new sql.Request(db);
      request.input('ORDER_ID_FK', sql.Int, req.body.orderIdFk);
      request.input('PRODUCT_ID_FK', sql.Int, req.body.productIdFk);
      request.input('PRODUCT_USER_NAME', sql.VarChar(20), req.body.productUserName);
      request.input('CANTIDAD', sql.Int, req.body.cantidad);
      request.input('PRECIO', sql.Decimal(10,6), req.body.precio);
      // request.input('SUB_TOTAL', sql.VarChar(200), req.body.subtotal);
      request.input('TOTAL', sql.Int, req.body.total);
      request.input('ACTIVO', sql.Bit, req.body.activo);
      request.input('CREATED_BY', sql.VarChar(50), req.body.createBy);
      request.execute('ORDER_DETAILS_INSERT', function(err, recordsets, returnValue, affected) {
        console.log(err);
        var result = recordsets[0];
        res.json(result);
     });
    }, productSearch: function(req, res, next){
      var request = new sql.Request(db);
      request.input('productId', sql.Int, req.body.productId);
      request.input('name', sql.VarChar(200), req.body.name);
      request.execute('PRODUCT_SELECT', function(err, recordsets, returnValue, affected) {
        console.log(err);
        var result = recordsets[0];
        res.json(result);
     });
    }, orderSearch: function(req, res, next){
      var request = new sql.Request(db);
      request.input('orderId', sql.Int, req.body.orderId);
      request.input('ncf', sql.VarChar(20), req.body.ncf);
      request.input('clientIdFk', sql.Int, req.body.clientIdFk);
      request.input('clientIdentity', sql.VarChar(20), req.body.clientIdentity);
      request.input('pageNumber', sql.Int, req.body.pageNumber);
      request.input('limit', sql.Int, req.body.limit);
      request.execute('ORDER_SEARCH', function(err, recordsets, returnValue, affected) {
        console.log(err);
        var result = recordsets[0];
        res.json(result);
     });
    }
  };

  return self;
};
