var express = require('express');
var router = express.Router();
//import csrf
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
    res.render('profile');
});

router.get('/logout', isLoggedIn, function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
   next();
});

//create aditional router
router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    //return view user signup
    res.render('signup', {csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length > 0});
});

router.get('/signup', passport.authenticate('local.signup',{
    failureRedirect: '/signup',
    failureFlash: true
}), function(req,res,next){
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/profile');
    }
});

router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    //return view user signup
    res.render('signin', {csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin',{
    failureRedirect: '/signin',
    failureFlash: true
}), function(req, res, next){
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/profile');
    }
});

module.exports = router;

//protection user routes

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next ();
    }
    res.redirect('/');
};

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next ();
    }
    res.redirect('/');
};