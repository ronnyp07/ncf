module.exports.start = function(){
  var http = require('http'),
  data = require('./database'),
  express = require('express'),
  sql = require('mssql'),
  path = require('path'),
  port = 8080,
  app = express(),
  config  = {
    user : 'sa',
    password: 'Sk3l3t0n$',
    database: 'POS',
    server: 'localhost\\SQLEXPRESS'
  },
//instantiate a connection pool
db = new sql.Connection(config),
bodyParser = require('body-parser'),
server = http.createServer(app);

      //load routes
      var index = require('../app/routes/index.server.route.js')(db);
      var ncf = require('../app/routes/ncf.server.route.js')(db);

      console.log(ncf);

      //Set View Engine
      app.set('views', './app/views');
      app.set('view engine', 'vash');

      //Set static folder
      app.use(express.static(__dirname + '/public'));

      //Body Parse
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended : false}));

      app.use('/', index);
      app.get('/moneda', ncf.get);

      db.connect().then(function() {
        console.log('Connection pool open for duty');

        var server = app.listen(8080, function () {

          var host = server.address().address;
          var port = server.address().port;

          console.log('Example app listening at http://%s:%s', host, port);

        });
      }).catch(function(err) {
        console.error('Error creating connection pool', err);
      });


      // server.listen(port, function() {
      //   console.log('server started');
      // });

   };