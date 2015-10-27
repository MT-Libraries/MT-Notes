/**
 * Created by thonatos on 14/12/7.
 */

var marked = require('marked');
var request = require('request');
var DOCUMENT = require('../common/conf/config_emu').docRepo();

exports.Controller = {

    get: function (req, res, mt) {

        // Query Single
        var _category = mt.category;
        var _document = decodeURI(mt.document.replace(/\.md$/, '')); // decodeURI for document named in chinese
        var _path = _category;

        if (DOCUMENT.url.indexOf('coding') !== -1) {
            _path = 'blob/master/' + _path;
        }

        var _query = {
            url: DOCUMENT.url + DOCUMENT.path + _path,
            access_token: DOCUMENT.access_token
        };

        renderData({
            document: _document,
            category: _category,
            template: 'docs/single',
            query: _query
        }, res);
    },

    gets: function (req, res, mt) {

        // Query Multi
        var _category = mt.category || '';
        var _document = decodeURI(mt.document.replace(/\.md$/, '')); // decodeURI for document named in chinese
        var _path = _category;

        if (DOCUMENT.url.indexOf('coding') !== -1) {
            _path = 'treeinfo/master/' + _path;
        }

        var _query = {
            url: DOCUMENT.url + DOCUMENT.path + _path,
            access_token: DOCUMENT.access_token
        };

        renderData({
            document: _document || 'Docs',
            category: _category.split('/').slice(0, -1).join('/'),
            template: 'docs/multi',
            query: _query
        }, res);

    }
};

function renderData(options, res) {

    var _content = [];
    var _render = true;
    var queryString = options.query;

    queryData(queryString, function (response) {

        if (response.code === 500) {

            // Connect Err.
            res.render(options.template, {
                title: options.document,
                pageContent: {
                    render: false,
                    title: options.document,
                    category: options.category,
                    content: response.data.msg
                }
            });

            return;
        }

        if (options.template === 'docs/single') {

            // Document File

            _render = true;

            if (queryString.url.indexOf('coding') !== -1) {
                _content = renderMarkdown(response.data, 'C');
            } else {
                _content = renderMarkdown(response.data, 'G');
            }

        } else if (options.template === 'docs/multi') {

            // Document Directory

            if (queryString.url.indexOf('coding') !== -1) {

                if (response.data.data === undefined) {
                    _render = false;
                    _content = response.data.msg;
                } else {
                    _content = response.data.data.infos;
                }


            } else {
                _content = response.data;
            }
        }

        res.locals.layout = 'docs/_layout';
        res.render(options.template, {
            title: options.document,
            pageContent: {
                render: _render,
                title: options.document,
                category: options.category,
                content: _content
            }
        });

    });
}

function renderMarkdown(json, t) {

    var _raw = '';
    var _html = '';

    if (t === 'C') {

        if (json.data.file) {
            _raw = json.data.file.data.toString('utf8');
            _html = marked(_raw);
        } else {
            _html = 'Wrong';
        }

    } else if (t === 'G') {

        if (json.content) {
            _raw = new Buffer(json.content, json.encoding).toString('utf8');
            _html = marked(_raw);
        } else {
            _html = json.message + ' . ' + json.documentation_url;
        }

    } else {
        _html = 'Wrong Type';
    }

    return _html;
}

function queryData(queryString, callback) {

    var _options = {
        url: queryString.url,
        headers: {
            'Authorization': 'token ' + queryString.access_token,
            'User-Agent': 'MT.Server',
            'Connection': 'keep-alive'
        },
        json: true,
        method: 'GET'
    };

    request(_options, function (err, response, json) {

        if (!err && response.statusCode === 200) {

            // Connect Successful
            callback({ code: 200, data: json });

        } else {

            // Connect Failed
            callback({
                code: 500,
                data: { msg: 'Remote server connect Failed.' }
            });
        }

    });
}