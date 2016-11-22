var http = require('http'),
    express = require('express'),
    app = express(),
    controller = require('./controllers'),
    server = http.createServer(app);

     app.set('view engine', 'vash');
     app.use(express.static(__dirname + '/public'));

     controller.init(app);
     server.listen(8080, function(){
     	console.log('server is up');
     });
