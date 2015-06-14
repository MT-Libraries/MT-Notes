/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var blogController = require('../blog/blogController').blogController;

module.exports = function (passport) {

    router.route('/')
        .get(function (req, res) {
            res.redirect('/user/signin');
        });

    router.route('/signin')
        .get(function (req, res) {
            res.render('user/signin', {
                pageTitle: 'Signin',
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
            res.render('user/signup', {
                pageTitle: 'Signup',
                pageName: 'user-signup',
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

            res.render('user/profile', {
                pageTitle: 'Profile',
                pageContent: {
                    'isAdministrator': isAdministrator
                }
            });
        });

    router.route('/admin')
        .get(isAdministrator, function (req, res) {
            res.render('user/admin', {
                pageTitle: 'Admin'
            });
        });

    /*
     * === Private Function ===
     * Function:
     *          add/put/del A Post
     * Return:
     *          object.json
     * */

    router.route('/post')
        .post(isAdministratorApi, blogController.add);

    router.route('/post/:pid')
        .put(isAdministratorApi, blogController.put)
        .delete(isAdministratorApi, blogController.del);

    /*
     * === Private Function ===
     * Function:
     *          auth before add/put/del a post.
     * Return:
     *          object.json
     * */

    function isAdministratorApi(req, res, next) {

        if (req.isAuthenticated() && (req.user.local.role === 'administrator')) {
            return next();
        }

        res.json({
            auth: false,
            data: {
                req: '',
                res: '',
                msg: 'Auth Failed,Please Sign in, And Try Again'
            }

        });
    }

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
