/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

module.exports = function (passport) {

    router.route('/')
        .get(function (req, res) {
            res.redirect('/user/signin');
        });

    router.route('/signin')
        .get(function (req, res) {
            res.locals.layout = 'user/_layout';
            res.render('user/signin', {
                title: 'Signin',
                message: req.flash('signInMessage')
            });
        })
        .post(passport.authenticate('local-signin', {
            successRedirect: '/user/profile',
            failureRedirect: '/user/signin',
            failureFlash: true
        }));

    router.route('/signup')
        .get(function (req, res) {
            res.locals.layout = 'user/_layout';
            res.render('user/signup', {
                title: 'Signup',
                message: req.flash('signUpMessage')
            });

        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/user/profile',
            failureRedirect: '/user/signup',
            failureFlash: true

        }));

    router.route('/signout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    router.route('/profile')
        .get(isSignedIn, function (req, res) {
            var isAdministrator = req.user.local.role === 'administrator';
            res.locals.layout = 'user/_layout_admin';
            res.render('user/profile', {
                title: 'Profile',
                pageContent: {
                    'isAdministrator': isAdministrator
                }
            });
        });

    router.route('/admin')
        .get(isAdministrator, function (req, res) {
            res.locals.layout = 'user/_layout_admin';
            res.render('user/admin', {
                title: 'Admin'
            });
        });


    /*
     * === Private Function ===
     * Function:
     *          auth before redirect to target page
     * Return:
     *          if not,turn to sign in page.
     * */

    function isSignedIn(req, res, next) {

        console.log(req.user);

        if (req.isAuthenticated()) {

            var _email = '';

            if(req.user && req.user.local && req.user.local.email){
                _email = req.user.local.email;
            }

            res.cookie('MT.User', {email:_email}, {expires: new Date(Date.now() + 900000), httpOnly: false });

            return next();
        }

        res.redirect('/user/signin');
    }

    function isAdministrator(req, res, next) {

        if (req.isAuthenticated() && (req.user.local.role === 'administrator')) {

            return next();
        }

        res.redirect('/user/profile');

    }

    return router;
};
