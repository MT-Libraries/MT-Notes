var express = require('express');
var router = express.Router();

var blogController = require('../blog/blogController').blogController;
var fmController  = require('../fm/fmController').fmController;

router.route('/')
    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to NOTES@MT!'
        });
    });


//  API -- Blog
router.route('/blog/page/:currentPage')
    .get(blogController.getAll);

router.route('/blog/post/:pid')
    .get(blogController.get);

// API -- FM
router.route('/fm/playlist')
    .get(fmController.getPlayList);
    
router.route('/fm/playlist/:plId')
    .get(fmController.getPlayList);

module.exports = router;
