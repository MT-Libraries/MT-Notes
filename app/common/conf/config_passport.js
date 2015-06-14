/**
 * Created by thonatos on 15/1/14.
 */

var User = require('../model/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app,passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });

        //User.load({ criteria: { _id: id } }, function (err, user) {
        //    done(err, user)
        //})
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) { // callback with email and password from our form

            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    if (err)
                        return done(err);

                    if (!user)
                        return done(null, false, req.flash('signInMessage', 'Oops! Wrong Email.'));

                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('signInMessage', 'Oops! Wrong Password.'));
                    } else {
                        return done(null, user);
                    }
                });
            });
        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            process.nextTick(function () {

                User.findOne({'local.email': email}, function (err, existingUser) {

                    var _defaultRole = 'user';

                    if (err) {
                        return done(err);
                    }

                    if (existingUser) {
                        return done(null, false, req.flash('signUpMessage', 'That email is already taken.'));
                    }

                    if (req.user) {

                        var user = req.user;

                        user.local.email = email;
                        user.local.password = user.generateHash(password); // use the generateHash function in our user model

                        if (email === app.get('administrator_email')) {
                            user.local.role = 'administrator';
                        }else{
                            user.local.role = _defaultRole;
                        }

                        user.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, user);
                        });

                    } else {

                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model

                        if (email === app.get('administrator_email')) {
                            newUser.local.role = 'administrator';
                        }else{
                            newUser.local.role = _defaultRole;
                        }

                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }

                });
            });
        }));

};