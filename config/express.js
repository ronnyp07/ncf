module.exports = function(){
   var  express = require('express'),
        app = express();


        app.use(express.static("./public"));
        app.set('views', './app/views');
        app.set('view engine', 'vash');

        //require('../app/routes/index.server.route.js')(app);

        return app;
};









