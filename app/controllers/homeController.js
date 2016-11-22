(function(homeController){

var data = require();

homeController.init = function(app){
  app.get('/', function(req, res){

    res.render('index', {tittle: 'Home'});
   });
};
})(module.exports);