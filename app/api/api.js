var express = require('express');
var router = express.Router();

var fmApi  = require('../fm/fmModule').Api;
var blogApi = require('../blog/blogModule').Api;
var moodApi = require('../mood/moodModule').Api;

/*
 * Show welcome message while path to root.
 * @return:   {msg:''}
 */

router.route('/')
    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to NOTES@MT!'
        });
    });

/*
 * Return json object according to query string.
 * @return:   {}
 */

router.route('/blog/get/:pid')
    .get(blogApi.get);

router.route('/blog/gets/:currentPage')
    .get(blogApi.gets);

router.route('/mood/get/:pid')
    .get(moodApi.get);

router.route('/mood/gets/:currentPage')
    .get(moodApi.gets);

router.route('/fm/playlist')
    .get(fmApi.getPlayList);
    
router.route('/fm/playlist/:plId')
    .get(fmApi.getPlayList);


module.exports = router;
