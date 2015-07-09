var fs = require('fs');
var path = require('path');

var morgan = require('morgan');
var express = require('express');
var index = require('serve-index');
var favicon = require('serve-favicon');
var session = require('express-session');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var compression = require('compression');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// ------------- CONFIG -------------

var app = express();

var CONFIG_ENV = {};
var CONFIG_SITE = {};
var CONFIG_AUTH = {};
var CONFIG_SSL = {};

var mtt = {

    getConf: function () {

        // READ CONF
        var privateConf = require('./app/common/conf/config_app')('app','APP');

        CONFIG_ENV = privateConf.env;
        CONFIG_SITE = privateConf.site;
        CONFIG_AUTH = privateConf.auth;
        CONFIG_SSL = privateConf.ssl;

    },

    setConf: function () {

        // MONGOOSE CONFIG
        var connect = function () {
            mongoose.connect(CONFIG_AUTH.database.url, CONFIG_AUTH.database.options);
        };
        connect();

        // MOOGOOSE EVENT
        // mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.on('error', console.log);
        mongoose.connection.on('disconnected', connect);
        mongoose.connection.once('open', function () {
            console.log('## APP: Database initialized with Mongoose.');
        });

        // PASSPORT FOR AUTH
        require('./app/common/conf/config_passport')(app, passport);

        // Compression middleware (should be placed before express.static)
        app.use(compression({
            threshold: 512
        }));

        app.use('/public', express.static(path.join(__dirname, 'public')));
        
        // INDEX STATIC DIR & FILES
        app.use('/static', express.static(path.join(__dirname, 'static')));
        app.use('/static', index(path.join(__dirname, 'static'),{
            stylesheet:'./public/css/css-page/static.min.css',
            view:'details'
        }));

        app.use(favicon(__dirname + '/public/favicon.ico'));

        app.set('site', CONFIG_SITE);
        app.set('config', CONFIG_ENV);
        app.set('ssl',CONFIG_SSL);
        app.set('administrator_email', CONFIG_AUTH.administrator.email);

        app.set('port', CONFIG_ENV.PORT || process.env.PORT);
        app.set('views', path.join(__dirname, 'app/common/views'));
        app.set('view engine', 'ejs');

        app.set('trust proxy', CONFIG_ENV.TRUST);

        app.use(morgan('tiny'));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser(CONFIG_AUTH.cookie.name));
        app.use(session({
            secret: CONFIG_AUTH.session.secret,
            resave: true,
            saveUninitialized: true,
            proxy: CONFIG_ENV.TRUST
            })
        );
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

        // ------------- ROUTERS -------------
        require('./app/route')(app, passport);

        // ------------- ERROR HANDLER -------------
        if (CONFIG_ENV.APP_DEVELOPMENT) {

            // development error handler
            app.use(function (req, res) {
                var err = new Error('Not Found');
                res.status(404);
                res.render('404', {
                    message: err.message,
                    status: err.status,
                    stack: err.stack
                });
            });
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('500', {
                    message: err.message,
                    error: err
                });
            });

        } else {

            // production error handler
            app.use(function (req, res) {
                var err = new Error('Not Found');
                err.status(404);
                res.render('404', {
                    message: err.message,
                    status: err.status,
                    stack: ''
                });
            });
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('500', {
                    message: err.message,
                    error: {}
                });
            });
        }

    },

    init: function () {
        this.setConf();
    }
};

mtt.getConf();
mtt.init();

module.exports = app;
