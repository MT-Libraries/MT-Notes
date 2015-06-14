/**
 * Created by thonatos on 14/11/27.
 */

var indexController = require('../index/indexController').indexController;

var express = require('express');
var router = express.Router();

router.route('/')
    .get(indexController.index);

router.route('/about')
    .get(indexController.about);

router.route('/fm')
    .get(indexController.fm);
    
router.route('/fm/:plId')
    .get(indexController.fm);

module.exports = router;
