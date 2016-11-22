// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

                // load up the user model
//var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var sql = require('mssql');
// var config = {
//         user: 'test',
//         password: '11111',
//         server: 'ICEFOX-PC\\SQLSQL',
//         database: 'dbusers'
// };
// sql.connect(config, function(err) {

//                     if (err){
//                         throw err ;
//                     } else{

//                         console.log('connected');
//                     }

//                 });
//    var request = new sql.Request([config]);
//         // expose this function to our app using module.exports
module.exports = function(passport, db) {
        var request = new sql.Request(db);

                    // =========================================================================
                    // passport session setup ==================================================
                    // =========================================================================
                    // required for persistent login sessions
                    // passport needs ability to serialize and unserialize users out of session

                    // used to serialize the user for the session
        passport.serializeUser(function(username, done) {
         done(null, username.userId);
        });

       // used to deserialize the user
        passport.deserializeUser(function(userId, done) {

        request.query("select * from tblusers where userId='"+userId+"'",function(err,rows){
        done(err, rows[0]);
      });
    });

    passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
    request.query("select * from tblusers where username='"+username+"'",function(err,rows){

    if (err)
    return done(err);
    if (!rows.length) {
    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
    }
    // if the user is found but the password is wrong
     if (!( rows[0].password == password))
     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

     // all is well, return successful user
     return done(null, rows[0]);
     console.log('loged');

    });
 }));
};