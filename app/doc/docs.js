/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var docsController = require('./docsController').docsController;

router.route('*')
    .all(function (req, res) {

        var category = '';
        var document = '';

        var url = req.originalUrl.split('/');
        url.shift(); // Remove url.indexOf('/');
        url.shift(); // Remove url.indexOf('/doc');

        if(url.length > 0){

            category = url.join('/');
            document = url[url.length - 1].replace(/\.md$/,'');

            if(url[url.length -1].match(/\.md$/g)){

                // for document
                docsController.getSingle(req,res,{category:category,document:document});
                return false;
            }else{

                // for category
                docsController.getMulti(req,res,{category:category,document:document});
                return false;
            }

        }else{

            category = url;
            document = '';

            docsController.getMulti(req,res,{category:category,document:document});
            return false;
        }

    });

module.exports = router;
