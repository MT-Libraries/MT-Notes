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
    app.use('/user', user(passport));
    app.use('/api',api);

};