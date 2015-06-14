/**
 * Created by thonatos on 15/4/30.
 */

var express = require('express');
var router = express.Router();

var fmController = require('../fm/fmController').fmController;

router.route('/')
    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to NOTES@MT!'
        });
    });

router.route('/music/:musicId')
    .get(fmController.get);

module.exports = router;