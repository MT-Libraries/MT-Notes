/**
 * Created by thonatos on 14/12/16.
 */

var express = require('express');
var router = express.Router();
var MobileDetect = require('mobile-detect');

var labsController = require('./labsController').labsController;

router.route('/')
    .get(function (req, res) {
        res.render('labs/index', {
            pageTitle: 'Demo'
        });
    });

router.route('/html-video')
    .get(labsController.htmlVideo);

router.route('/mt-notes')
    .get(labsController.mtNotes);

router.route('/update-browser')
    .get(labsController.updateBrowser);

router.route('/touch-event')
    .get(function (req, res) {

        var mobileDetect = new MobileDetect(req.headers['user-agent'], 768);

        if (mobileDetect.mobile()) {

            if (mobileDetect.tablet() && !mobileDetect.is('AndroidOS')) {
                res.render('labs/touch-event', {
                    pageTitle: 'Touch Event'
                });
            } else {
                res.render('labs/touch-event-mobile', {
                    pageTitle: 'Touch Event'
                });
            }

        } else {
            // Desktop
            res.render('labs/touch-event', {
                pageTitle: 'Touch Event'
            });
        }


    });

module.exports = router;