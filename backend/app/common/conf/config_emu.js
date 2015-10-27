/**
 * Created by thonatos on 14/12/19.
 */

var fs      = require('fs');
var path    = require('path');

var CONFIG_APP = require('./config_app')('api','config_emu');
var SOURCE_DOC = CONFIG_APP.config.docs_source;

module.exports = {

    docRepo: function () {

        var _source = 'C' || SOURCE_DOC;

        if(_source === 'C'){

            var _coding = CONFIG_APP.coding;

            var CODING = {
                url:'https://coding.net',
                // path: '/api/user/MTTUSER/project/MTTPROJECT/git/',
                access_token:''
            };

            var _path = '/api/user/' + _coding.doc_user + '/project/' + _coding.doc_project + '/git/';

            CODING.path = _path;

            return CODING;

        }else{

            var _github = CONFIG_APP.github;

            var GITHUB = {
                url:'https://api.github.com'
                // path: '/repos/MTTUSER/MTTPROJECT/contents/',
                // access_token:CONFIG_APP.github.access_token
            };

            var _path = '/repos/' + _github.doc_user + '/' + _github.doc_project + '/contents/';

            GITHUB.path = _path;
            GITHUB.access_token = _github.access_token;

            return GITHUB;

        }
    }
};