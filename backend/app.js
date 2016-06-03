var path = require('path');

var hbs = require('hbs');
var morgan = require('morgan');
var express = require('express');
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
var CONFIG = {};
var STATUS = {};

function Initialize() {

    // 配置读取
    var env = require('./app/common/conf/config_env')();

    STATUS = require('./app/common/enum/status').status;
    CONFIG = require('./app/common/conf/config_app')('app', env.dev);
    CONFIG.env = env;
}

Initialize.prototype.confDatabase = function () {

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
        console.log('## MT-NODE: Initialize database with Mongoose.');
    });
};

Initialize.prototype.confViewEngine = function () {
    
    // 模板变量        
    app.locals.app = {
        env: CONFIG.env,
        site:CONFIG.site,
        year: (new Date()).getFullYear(),
        menu:[
            {name: 'Home', link: '/'},
            {name: 'Mood', link: '/mood'},
            {name: 'Blog', link: 'http://blog.thonatos.com'},
            {name: 'FM', link: '/fm'}
        ]
    };
    
    /**
     * 模板拓展
     * 为HBS提供extend、block等功能
     */ 

    // extend
    hbs.localsAsTemplateData(app);
    hbs.registerHelper('extend', function (name, context) {
        var block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }

        block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
    });

    // block
    var blocks = {};
    hbs.registerHelper('block', function (name) {
        var val = (blocks[name] || []).join('\n');

        // clear the block
        blocks[name] = [];
        return val;
    });

    // 模板引擎
    app.set('view engine', 'hbs');

    if (CONFIG.env.dev) {
        app.set('views', path.join(__dirname, '../frontend/src/tpl/dev'));
        hbs.registerPartials(path.join(__dirname, '../frontend/src/tpl/dev/tpl'));
    } else {
        app.set('views', path.join(__dirname, '../frontend/src/tpl/pro'));
        hbs.registerPartials(path.join(__dirname, '../frontend/src/tpl/pro/tpl'));
    }
      
};

Initialize.prototype.init = function () {
                  
    // APP SETTING  
               
    // 端口配置
    app.set('port', CONFIG.env.port || process.env.PORT);
    app.set('trust proxy', CONFIG.env.trust);    
        
    // 设置认证 - PASSPORT FOR AUTH
    app.set('founder',CONFIG.auth.administrator.email);

    // 模板引擎
    this.confViewEngine();    
    this.confDatabase();
        
    // 资源配置
    app.use(compression({
        threshold: 512 // Compression middleware (should be placed before express.static)
    }));
    app.use('/public', express.static(path.join(__dirname, '../frontend/public')));
    app.use(favicon(path.join(__dirname,'../frontend/public/favicon.ico')));            
    
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
        
    // 设置认证
    require('./app/common/conf/config_passport')(app, passport);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    
    // 路由定义
    require('./app/router')(app,passport);

    // 错误处理
    if (CONFIG.env.dev) {

        // development error handler
        app.use(function (req, res) {
            var err = new Error('Not Found');
            res.status(404);
            res.render('404', {
                message: err.message,
                stack: err.stack
            });
        });
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render('500', {
                message: err.message,
                error: err
            });
        });

    } else {

        // production error handler
        app.use(function (req, res) {
            res.json(STATUS.S404);
        });
        
        app.use(function (err, req, res, next) {
            res.json(STATUS.S500);
        });
    }
};

var mt = new Initialize();
mt.init();

module.exports = app;
