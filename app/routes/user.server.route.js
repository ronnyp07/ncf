
var bcrypt   = require('bcryptjs');
var sql = require('mssql');

module.exports = function(app, db){
	var request = new sql.Request(db);
	app.post('/singup ', function(req, res, next) {
		var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		request.input('firstName', sql.VarChar(50), req.body.firstName);
		request.input('lastName', sql.VarChar(50), req.body.lastName);
		request.input('email', sql.VarChar(50), req.body.email);
		request.input('userName', sql.VarChar(50), req.body.userName);
		request.input('password', sql.VarChar(200),hash);
		request.input('companyIdFk', sql.Int, req.body.companyIdFk);
		request.input('createdBy', sql.VarChar(50), req.body.createdBy);
		request.execute('USER_INSERT', function(err, recordsets, returnValue, affected) {
			if(err){
				console.log(err);
				return res.status(400).send({
					message: err
				});
			}
			res.send(200);
	});
 });

app.get('/logout', function(req, res, next) {
     req.session.reset();
     res.redirect('/');
});

app.get('/profile', function(req, res, next){
       if(req.session && req.session.user){
       	request.input('userId', sql.VarChar(50), req.body.userId);
		request.input('username', sql.VarChar(50), req.session.user.USERNAME);
		request.execute('USERS_SELECT', function(err, recordsets, returnValue, affected) {
			if(err){
				console.log(err);
				return res.status(400).send({
					message: err
				});
			}else{
              if(!recordsets[0].length){
              	 req.session.reset();
                 res.render('index');
                }else{
                  var result = recordsets[0];
                  console.log(result[0]);
                  res.locals.user = result;
                  res.render('profile', {user: result[0]});
                }
			}
		});
      }else{
      	 res.render('index');
      }
});

app.post('/', function(req, res, next) {
		request.input('userId', sql.VarChar(50), req.body.userId);
		request.input('username', sql.VarChar(50), req.body.username);
		request.execute('USERS_SELECT', function(err, recordsets, returnValue, affected) {
			if(err){
				console.log(err);
				return res.status(400).send({
					message: err
				});
			}else{
               if(!recordsets[0].length){
                 res.render('index', {err: "Verificar su informacion e intentar de nuevo"
              //, csrfToken : req.csrfToken()}
                  });
                }else{
                	var result = recordsets[0];
                    //res.json(result[0]);
                    if(bcrypt.compareSync(req.body.password, result[0].PASSWORD)){
                        res.locals.user  = result[0];
                        req.session.user = result[0];
                   //      console.log(result[0]);
             		    // console.log('verore');
                    	res.redirect('/profile');
                     }else{
                        res.render('index', {err: "Contraseña invalida intentar de nuevo"});
                     }
                }
			}
		});
 });

};