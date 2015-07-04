/**
 * Created by thonatos on 14/12/16.
 */

var express = require('express');
var router = express.Router();
var MobileDetect = require('mobile-detect');

var labsController = require('./labsModule').Controller;

router.route('/')
    .get(function (req, res) {
        res.render('labs/index', {
            pageTitle: 'Demo'
        });
    });

router.route('/html-video')
    .get(labsController.htmlVideo);

router.route('/update-browser')
    .get(labsController.updateBrowser);

router.route('/mobile-detect')
    .get(function (req, res) {

        var mobileDetect = new MobileDetect(req.headers['user-agent'], 768);

        if (mobileDetect.mobile()) {

            if (mobileDetect.tablet() && !mobileDetect.is('AndroidOS')) {
                res.send('tablet');
            } else {
                res.send('mobile');
            }

        } else {
            // Desktop
            res.send('desktop');
        }

    });

module.exports = router;