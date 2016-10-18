(function(controller){

var homeController = ('./homeController');

controller.init = function(app){
    // homeController.init(app);
    app.get('/', function(req, res){
    	res.render('index', {title: 'Home'})

    })
}

})(module.exports);