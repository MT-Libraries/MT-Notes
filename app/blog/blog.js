/**
 * Created by thonatos on 15/1/10.
 */

var express = require('express');
var router = express.Router();

var blogController = require('./blogModule').Controller;

router.route('/')
    .get(blogController.gets);

router.route('/get/:pid')
    .get(blogController.get);

router.route('/gets/:currentPage')
    .get(blogController.gets);

module.exports = router;