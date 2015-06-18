/**
 * Created by thonatos on 15/1/26.
 */

var express = require('express');
var router = express.Router();

var fileController = require('./fileModule').Controller;

router.route('/')
    .get(fileController.list);

router.route('/remote')
    .get(fileController.remote);

router.route('/download')
    .post(fileController.download);

router.route('/upload')
    .post(fileController.upload);

module.exports = router;