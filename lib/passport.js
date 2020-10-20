module.exports = function(app){
    var authData = {
        email:'root@gmail.com',
        password:'toor',
        nickname:'Choi'
      };
    // include passport.js
    var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.email);
    });

    passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    done(null, authData);
    });

    passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd'
    },
    function(username, password, done) {
    if(username === authData.email){
        if(password === authData.password){
        return done(null, authData);
        } else{
        return done(null, false, {
            message: 'Incorrect password.' 
        });  
        }
    } else{
        return done(null, false, {
        message: 'Incorrect username.' 
        });
    }
    }
    ));
    return passport;
}