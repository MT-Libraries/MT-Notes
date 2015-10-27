var fs = require('fs');
var path = require('path');

var hbs = require('hbs');
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

function prepare(){

    // 读取配置 - Read Config
    var appConf = require('./app/common/conf/config_app')('app','APP');
    var appRun = require('./app_run');
    var enumEnv = require('./enum_env');

    if (!!appRun && appRun.run) {
        appConf.env = enumEnv[appRun.run];
        return appConf;
    }

    appConf.env = enumEnv.dev;
    return appConf;
}

function init(conf){

    var CONFIG = conf;

    function initDb(){

        // 设置数据库 - MONGOOSE CONFIG

        var connect = function () {
            mongoose.connect(CONFIG.auth.database.url, CONFIG.auth.database.options);
        };

        connect();

        // MOOGOOSE EVENT
        // mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.on('error', console.log);
        mongoose.connection.on('disconnected', connect);
        mongoose.connection.once('open', function () {
            console.log('## APP: Database initialized with Mongoose.');
        });
    }
    initDb();

    // 设置认证 - PASSPORT FOR AUTH

    require('./app/common/conf/config_passport')(app, passport);

    // 设置压缩 - COMPRESSION
    // Compression middleware (should be placed before express.static)
    app.use(compression({threshold: 512}));

    // 静态目录 - PUBLIC DIR
    app.use('/public', express.static(path.join(__dirname, '../frontend/public')));
    
    // INDEX STATIC DIR & FILES
    app.use('/static', express.static(path.join(__dirname, 'static')));
    app.use('/static', index(path.join(__dirname, 'static'),{
        stylesheet:path.join(__dirname,'../frontend/public/css/dev/static.css'),
        view:'details'
    }));

    app.use(favicon(path.join(__dirname,'../frontend/public/favicon.ico')));
    app.set('administrator_email', CONFIG.auth.administrator.email);
    app.set('port', CONFIG.env.port || process.env.PORT);


    function initViewEngine(){

        // 设置模板引擎 - VIEW ENGINE & HBS

        var blocks = {};

        // locals
        app.locals.app = {};
        app.locals.app.site = CONFIG.site;
        app.locals.app.env = CONFIG.env;
        app.locals.app.year = (new Date()).getFullYear();
        app.locals.app.menu = [
            {name: 'Home', link: '/'},
            {name: 'Mood', link: '/mood'},
            {name: 'Blog', link: 'http://blog.thonatos.com'},
            {name: 'Docs', link: '/docs'},
            {name: 'FM', link: '/fm'}
        ];

        // hbs
        hbs.localsAsTemplateData(app);
        hbs.registerHelper('extend', function(name, context) {
            var block = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }

            block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
        });

        hbs.registerHelper('block', function(name) {
            var val = (blocks[name] || []).join('\n');

            // clear the block
            blocks[name] = [];
            return val;
        });

        app.set('view engine', 'hbs');

        if (CONFIG.env.dev) {
            app.set('views', path.join(__dirname, '../frontend/src/tpl/dev'));
            hbs.registerPartials(path.join(__dirname, '../frontend/src/tpl/dev/tpl'));
        } else {
            app.set('views', path.join(__dirname, '../frontend/src/tpl/pro'));
            hbs.registerPartials(path.join(__dirname, '../frontend/src/tpl/pro/tpl'));
        }

    }
    initViewEngine();

    app.set('trust proxy', CONFIG.env.trust);
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser(CONFIG.auth.cookie.name));
    app.use(session({
        secret: CONFIG.auth.session.secret,
        resave: true,
        saveUninitialized: true,
        proxy: CONFIG.env.trust
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // ------------- ROUTERS -------------
    require('./app/route')(app, passport);

    // ------------- ERROR HANDLER -------------
    if (CONFIG.env.dev) {

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
            res.status(404).send('Sorry, we cannot find that!');
        });
        app.use(function (err, req, res, next) {
            res.status(err.status).send({ error: 'something blew up' });
        });
    }

}

var _conf = prepare();
init(_conf);

module.exports = app;
