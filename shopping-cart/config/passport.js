var passport  = require('passport');
var User = require('../models/user');
var LocalStrategy =require('passport-local').Strategy;

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
   User.findById(id, function(err, user){
      done(err, user);

   });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
},
    function(req, Email, Password, done){
        //validate parameters
        req.checkBody('Email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('Password', 'Invalid password').notEmpty().isLength({min:8});
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            return done(null,false, req.flash('error', messages));
        }
        User.findOne({'Email':Email},function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done (null, false, {message: 'Email is already in use.'});
            }
            var newUser = new User();
            newUser.Email = Email;
            newUser.Password = newUser.encryprtPassword(Password);
            newUser.save(function(err, result){
                if(err){
                    return done(err);
                }
                return done(null,newUser);
            });

        });
}));

//signin
passport.use('local.signin', new LocalStrategy({
    useremailField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
},
    function(req, Email, Password, done){
        //validate parameters
        req.checkBody('Email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('Password', 'Invalid password').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            return done(null,false, req.flash('error', messages));
        }

    User.findOne({'Email':Email},function(err, user){
         if(err){
             return done(err);
         }
         if(!user){
            return done (null, false, {message: 'No user found.'});
         }
        if (!user.validPassword(password)){
            return done (null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });
}));