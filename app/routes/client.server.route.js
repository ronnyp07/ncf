var sql = require('mssql');

module.exports = function(db){
var self = {
   getClientFilter: function(req, res, next){
      console.log(req.query);
    	var request = new sql.Request(db);
    	request.input('client', sql.VarChar(50), req.query.client);
    	request.execute('CLIENT_SELECT', function(err, recordsets, returnValue, affected) {
    		console.log(err);

    		var result = recordsets[0];
    		res.json(result);
     });
    }
  };

  return self;
};

