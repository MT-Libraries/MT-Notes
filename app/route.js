/**
 * Created by thonatos on 15/1/14.
 */

module.exports = function (app, passport) {

    // Default
    var index = require('./index/index');
    var blog = require('./blog/blog');
    var docs = require('./doc/docs');
    var user = require('./user/user');
    var labs = require('./labs/labs');
    var file = require('./file/file');
    var fm = require('./fm/fm');


    // Api
    var api   = require('./api/api');

    app.use('/', index);

    //app.use(/^\/doc\w{0,1}/, docs);
    app.use('/docs', docs);
    app.use('/blog', blog);
    app.use('/labs', labs);
    app.use('/file', file);
    app.use('/fm',fm);
    app.use('/user', user(passport));
    app.use('/api',api);

};