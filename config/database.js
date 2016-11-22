(function(database){
  var sql = require('mssql'),
      config = {
      	user : 'sa',
      	password: 'Sk3l3t0n$',
      	database: 'POS',
      	server: 'localhost\\SQLEXPRESS'
      };

  database.getDb = function(next){
       sql.connect(config, function(err){
             if (err){
             	console.log(err);
             	console.log('failed connecting');
                next(err, null);
              } else{
              	console.log('connected');
              	var request = new sql.Request([config]);
                next(null, request);
              }
       });
  };

})(module.exports);