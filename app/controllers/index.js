(function(controller){

var homeController = require('./homeController');

//var ncf = require('./');

controller.init = function(app){
	  console.log('requite');
      homeController.init(app);
    // app.get('/', function(req, res){
    // 	res.render('index', {title: 'Home'});

    // });
};

})(module.exports);