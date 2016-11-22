var sql = require('mssql');

module.exports = function(db){
var self = {
    getMoneda: function(req, res, next) {
      var request = new sql.Request(db);
      request.query("select * from moneda where activo =" + "'true'" , function(err, recordset) {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
          return;
        }
        res.status(200).json(recordset);
      });
    },getImpuestos: function(req, res, next) {
      var request = new sql.Request(db);
      request.query("select * from impuestos where activo =" + "'true'", function(err, recordset) {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
          return;
        }
        res.status(200).json(recordset);
      });
    },ncfList: function(req, res, next){
    	var request = new sql.Request(db);
    	request.input('ncfSucursalIdPk', sql.Int, req.params.NCF_SUCURSAL_ID_PK ? res.params.NCF_SUCURSAL_ID_PK: null );
    	request.input('companyServioIdFk', sql.Int, req.params.COMPANIA_SERVICIO_ID_FK);
    	request.input('sucursal', sql.Int, req.params.Sucursal);
    	request.input('serie', sql.Char(1), req.params.SERIE);
    	request.input('numdiv', sql.Char(2), req.params.NUMDIV);
    	request.input('numare', sql.Char(3), req.params.NUMARE);
    	request.input('numemi', sql.Char(3), req.params.NUMEMI);
    	request.input('code', sql.Char(2), req.params.CODE);
    	request.input('secuenciaInicial', sql.Int, req.params.SecuenciaInicial);
    	request.input('secuenciaFinal', sql.Int, req.params.SecuenaciaFinal);
    	request.input('secuenciaActual', sql.Int, req.params.SecuenaciaActual);
    	request.input('activo', sql.Bit, req.params.ACTIVO);
    	request.input('createdBy', sql.VarChar(50), req.params.CREATE_BY);
    	request.input('createDate', sql.DateTime, req.params.CREATE_DATE);
    	request.input('modifiedBy', sql.VarChar(50), req.params.MODIFIED_BY);
    	request.input('modifiedDate', sql.DateTime, req.params.MODIFIED_DATE);
    	request.execute('NCF_SUCURSAL_SEARCH', function(err, recordsets, returnValue, affected) {
    		console.log(err);
    		var result = recordsets[0];
    		res.json(result);
     });
    },ncfAction: function(req, res, next){
      var request = new sql.Request(db);
      console.log(req.body.ncfIdPk);
      request.input('NCF_SUCURSAL_ID_PK', sql.Int, req.body.ncfIdPk);
      request.input('parNCF', sql.VarChar(19), req.body.parNCF);

      request.execute('GET_NFC_Sucursales', function(err, recordsets, returnValue, affected) {
        console.log(err);
        var result = recordsets[0];
        res.json(result[0]);
     });
    },ncfTypes : function(req, res, next){
      var request = new sql.Request(db);
      request.query("select * from NCF_TYPES" , function(err, recordset) {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
          return;
        }
        res.status(200).json(recordset);
      });
    }, ncf: function(req, res, next){
     var ncf = req.body;
        var request = new sql.Request(db);
         request.input('companyServioIdFk', sql.Int, req.body.company);
         request.input('sucursal', sql.Int, req.body.sucursal);
         request.input('serie', sql.Char(1), req.body.serie);
         request.input('numdiv', sql.Char(2), req.body.numdiv);
         request.input('numare', sql.Char(3), req.body.numare);
         request.input('numemi', sql.Char(3), req.body.numemi);
         request.input('code', sql.Char(2), req.body.code);
         request.input('secuenciaInicial', sql.Int, req.body.SecInicial);
         request.input('secuenciaFinal', sql.Int, req.body.SecFinal);
         request.input('activo', sql.Bit, req.body.activo);
         request.input('createdBy', sql.VarChar(50), req.body.createBy);
         request.execute('NCF_SUCURSAL_CREATE', function(err, recordsets, returnValue, affected) {
           console.log(err);
           res.json(ncf);
         });
   }
  };

  return self;
};

// var express = require('express'),
// db = require('../../config/database.js'),
// router = express.Router(),
// sql = require('mssql');
// config = {
// 	user : 'sa',
// 	password: 'Sk3l3t0n$',
// 	database: 'POS',
// 	server: 'localhost\\SQLEXPRESS'
// };



// router.get('/ncf', function(req, res, next){
// 	db.getDb(function(err, db){
// 		if(err){
// 			console.log('err');
// 			res.send(err);
// 		}else{

// 			db.input('ncfSucursalIdPk', sql.Int, req.params.NCF_SUCURSAL_ID_PK ? res.params.NCF_SUCURSAL_ID_PK: null );
// 			db.input('companyServioIdFk', sql.Int, req.params.COMPANIA_SERVICIO_ID_FK);
// 			db.input('sucursal', sql.Int, req.params.Sucursal);
// 			db.input('serie', sql.Char(1), req.params.SERIE);
// 			db.input('numdiv', sql.Char(2), req.params.NUMDIV);
// 			db.input('numare', sql.Char(3), req.params.NUMARE);
// 			db.input('numemi', sql.Char(3), req.params.NUMEMI);
// 			db.input('code', sql.Char(2), req.params.CODE);
// 			db.input('secuenciaInicial', sql.Int, req.params.SecuenciaInicial);
// 			db.input('secuenciaFinal', sql.Int, req.params.SecuenaciaFinal);
// 			db.input('secuenciaActual', sql.Int, req.params.SecuenaciaActual);
// 			db.input('activo', sql.Bit, req.params.ACTIVO);
// 			db.input('createdBy', sql.VarChar(50), req.params.CREATE_BY);
// 			db.input('createDate', sql.DateTime, req.params.CREATE_DATE);
// 			db.input('modifiedBy', sql.VarChar(50), req.params.MODIFIED_BY);
// 			db.input('modifiedDate', sql.DateTime, req.params.MODIFIED_DATE);

// 			db.execute('NCF_SUCURSAL_SEARCH', function(err, recordsets, returnValue, affected) {
// 				console.log(err);
// 				var result = recordsets[0];
// 				res.json(result);
//     //res.send(200); console.log(request.parameters.output_parameter.value); // output value
// });
// 		}
// 	});
// });


// router.get('/moneda', function(req, res, next){
// sql.connect(config).then(function (err) {
// 		var sqlrequest = new sql.Request();
// 		sqlrequest.query("select * from moneda where activo =" + "'true'").then(function (recordset) {
// 			sql.close(function (value) {
// 				console.log("connection6 closed");
// 			});
// 			return res.status(200).send(recordset);

// 		}).catch(function (err) {
// 			console.log(err);
// 		});
// 	}).catch(function (err) {
// 		console.log(err);
// 	});

// // db.getDb(function(err, db){
// // 	if(err){
// // 		console.log('err');
// // 		res.send(err);
// // 	}else{
// // 		db.query("select * from moneda where activo =" + "'true'" , function(err, data){
// // 			console.log(err);
// // 			res.json(data);
// // 		});
// // 	}
// // });
// });

// router.get('/impuestos', function(req, res, next){
// sql.connect(config).then(function (err) {
// 		var sqlrequest = new sql.Request();
// 		sqlrequest.query("select * from impuestos where activo =" + "'true'" ).then(function (recordset) {
// 			sql.close(function (value) {
// 				console.log("connection6 closed");
// 			});
// 			return res.status(200).send(recordset);

// 		}).catch(function (err) {
// 			console.log(err);
// 		});
// 	}).catch(function (err) {
// 		console.log(err);
// 	});
// 	// db.getDb(function(err, db){
// 	// 	if(err){
// 	// 		console.log('err');
// 	// 		res.send(err);
// 	// 	}else{
// 	// 		db.query("select * from impuestos where activo =" + "'true'" , function(err, data){
// 	// 			console.log(err);
// 	// 			res.json(data);
// 	// 		});
// 	// 	}
// 	// });
// });


// router.post('/ncf', function(req, res, next){
// 	var ncf = req.body;


// //Get NCF
// router.get('/ncf/:id', function(req, res, next){
// 	var ncf = req.body;
// 	console.log(req.params.id);
// 	db.getDb(function(err, db){
// 		if(err){
// 			console.log('err');
// 			res.send(err);
// 		}else{
// 			db.input('CODE_PK', sql.Int, req.params.id);
// 			db.execute('NCF_TYPES_SELECT', function(err, recordsets, returnValue, affected) {
// 		  //  var rv = {};
// 				// for (var i = 0; i < recordsets[0].length; ++i){
// 				// 	rv[i] = recordsets[i];
// 				// }
// 				console.log(recordsets);
// 				var result = recordsets[0];
// 				res.json(result[0]);
// 			});
// 		}
// 	});
// });

// //Update NCF
// // app.put('/ncf/:id', function(req, res, next){
// //        var ncf = req.body;
// //        var ncfInfo = {};

// //        if(ncf.code){
// //         ncfInfo.code = ncf.
// //        }

// // });

// module.exports = router;