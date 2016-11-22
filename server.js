// var http = require('http'),
//       data = require('./config/database'),
//       express = require('express'),
//       path = require('path'),
//       port = 8080,
//       app = express(),
//       //app = require('./express.js'),
//       bodyParser = require('body-parser'),
//       server = http.createServer(app);

//       //load routes
//       //Set View Engine
//       app.set('views', './app/views');
//       app.set('view engine', 'vash');

//       //Set static folder
//        app.use(express.static(__dirname + '/public'));

//       //Body Parse
//       app.use(bodyParser.json());
//       app.use(bodyParser.urlencoded({extended : false}));

//       app.use('/', index);
//       app.use('/api', ncf);



//       server.listen(port, function() {
//               console.log('server started');
//       });

//      //  data.getDb(function(err, db){
//      //     if(err){
//      //  	   console.log('err');
//      //     }else{

//      //      // db.query("select * from NCF_TYPES", function(err, data){
//      //      //      console.log(data);
//      //      // });
//      //  }
//      // });


  var http = require('http'),
  //data = require('./database'),
  express = require('express'),
  sql = require('mssql'),
  path = require('path'),
  port = 8080,
  app = express(),
  passport = require('passport'),
  config  = {
    user : 'sa',
    password: 'Sk3l3t0n$',
    database: 'POS',
    server: 'localhost\\SQLEXPRESS'
  },
  session = require('client-sessions'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
//instantiate a connection pool
  db = new sql.Connection(config),
  bodyParser = require('body-parser'),
  server = http.createServer(app);

      app.use(session({
       cookieName: 'session',
       secret: 'kljljljlasdfhalsdjfljlj',
       duration: 60 * 60 * 2000,
       activeDuration: 60 * 60 * 1000,
       httpOnly: true,
       ephemeral: true
     }));
      //Set View Engine
      app.set('views', './app/views');
      app.set('view engine', 'vash');

      app.use(flash());
      app.use(passport.initialize());
      app.use(passport.session());

      //Set static folder
      app.use(express.static(__dirname + '/public'));

      //Body Parse
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended : false}));
      app.use(methodOverride());



     require('./config/passport')(passport, db); // pass passport for configuration

      // Give Views/Layouts direct access to session data.
      app.use(function(req, res, next){
        console.log(req.user);
        res.locals.user = req.user;
       next();
      });

                  //load routes
      var ncf = require('./app/routes/ncf.server.route.js')(db);
      var client = require('./app/routes/client.server.route.js')(db);
      var order = require('./app/routes/order.server.route.js')(db);
      require('./app/routes/user.server.route.js')(app, db);


      //load routers;
      app.get('/', function(req, res, next){
         res.render('index');
       });

      app.get('/api/ncf', ncf.ncfList);
      app.get('/api/moneda', ncf.getMoneda);
      app.get('/api/impuestos', ncf.getImpuestos);
      app.get('/api/clientGet', client.getClientFilter);
      app.post('/api/order', order.create);
      app.post('/api/orderSearch', order.orderSearch);
      app.post('/api/createDetails', order.createDetails);
      app.post('/api/ncfAction', ncf.ncfAction);
      app.get('/api/ncfTypes', ncf.ncfTypes);
      app.post('/api/productSearch', order.productSearch);
      app.post('/api/ncf', ncf.ncf);


      db.connect().then(function() {
        console.log('Connection pool open for duty');

         server.listen(8080, function () {
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
