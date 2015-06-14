/**
 * Created by thonatos on 14/12/19.
 */

var fs      = require('fs');
var path    = require('path');

var CONFIG_APP = require('./config_app')('EMU').site.docRepo;
var UTIL = require('../utils/obj');

var CODING = {
    host: 'coding.net',
    port: 443,
    path: '/api/user/MTTUSER/project/MTTPROJECT/git/',
    access_token:''
};

var GITHUB = {
    host: 'api.github.com',
    port: 443,
    path: '/repos/MTTUSER/MTTPROJECT/contents/',
    access_token:CONFIG_APP.github.access_token
};

module.exports = {

    docRepo: function () {

        if (CONFIG_APP.GC === "G") {

            var _g = UTIL.cloneObj(GITHUB);

            _g.path = _g.path.replace(/MTTUSER/g, CONFIG_APP.github.doc_user);
            _g.path = _g.path.replace(/MTTPROJECT/g, CONFIG_APP.github.doc_project);

            return _g;

        } else {

            var _c = UTIL.cloneObj(CODING);
            _c.path = _c.path.replace(/MTTUSER/g, CONFIG_APP.coding.doc_user);
            _c.path = _c.path.replace(/MTTPROJECT/g, CONFIG_APP.coding.doc_project);

            return _c;
        }
    }
};