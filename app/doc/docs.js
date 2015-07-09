/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var docsController = require('./docsModule').Controller;

router.route('*')
    .all(function (req, res) {

        var category = '';
        var document = '';

        var _oriUrl = req.originalUrl;

        if (_oriUrl.lastIndexOf('/') === (_oriUrl.length - 1)) {
            // console.log('end with /');
            _oriUrl = _oriUrl.slice(0, -1); // Remove '/' From request.path;
        }

        var url = _oriUrl.split('/');

        url.shift(); // Remove url.indexOf('/');
        url.shift(); // Remove url.indexOf('/doc');

        category = url.join('/');

        if (url.length > 0) {

            document = url[url.length - 1].replace(/\.md$/, '');

            if (url[url.length - 1].match(/\.md$/g)) {

                // for document
                docsController.get(req, res, {category: category, document: document});
                return false;
            } else {

                // for category
                docsController.gets(req, res, {category: category, document: document});
                return false;
            }

        } else {

            document = '';

            docsController.gets(req, res, {category: category, document: document});
            return false;
        }

    });

module.exports = router;
