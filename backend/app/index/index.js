/**
 * Created by thonatos on 14/11/27.
 */

var indexController = require('../index/indexModule').Controller;

var express = require('express');
var router = express.Router();

router.route('/')
    .get(indexController.index);

router.route('/mood')
    .get(indexController.mood);

router.route('/fm')
    .get(indexController.fm);
    
router.route('/fm/:plId')
    .get(indexController.fm);

module.exports = router;
