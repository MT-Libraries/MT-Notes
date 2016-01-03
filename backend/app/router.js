/**
 * Created by thonatos on 15/1/14.
 */

module.exports = function (app, passport) {

    // Default
    var index = require('./index/index');
    var user = require('./user/user');

    // Api
    var api   = require('./api/api');

    app.use('/', index);
    app.use('/crossdomain.xml',function(req,res){
        res.set('Content-Type', 'text/xml');
        res.send('<?xml version="1.0"?><cross-domain-policy><allow-access-from domain="*"/><allow-http-request-headers-from domain="*" headers="*"/></cross-domain-policy>');        
    });    
    app.use('/user', user(passport));
    app.use('/api',api);

};