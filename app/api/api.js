var express = require('express');
var router = express.Router();

var fmApi = require('../fm/fmModule').Api;
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
 * Public Function
 * Return json object according to query string.
 * @return:   {}
 */

router.route('/blog/get/:pid')
    .get(blogApi.get);

router.route('/blog/gets/:currentPage')
    .get(blogApi.gets);

router.route('/moods/get/:mid')
    .get(moodApi.get);

router.route('/moods/gets/:currentPage')
    .get(moodApi.gets);


router.route('/fm/playlist')
    .get(fmApi.getPlayList);

router.route('/fm/playlist/:plId')
    .get(fmApi.getPlayList);

/*
 * Private Function
 * Return json object according to query string.
 * @return:   {}
 */


router.route('/blog/post')
    .post(isAdministratorApi, blogApi.add);

router.route('/blog/post/:pid')
    .put(isAdministratorApi, blogApi.put)
    .delete(isAdministratorApi, blogApi.del);

router.route('/moods/mood')
    .post(isAdministratorApi, moodApi.add);

router.route('/moods/mood/:mid')
    .put(isAdministratorApi, moodApi.put)
    .delete(isAdministratorApi, moodApi.del);

/*
 * Protected Function
 */

function isAdministratorApi(req, res, next) {

    if (req.isAuthenticated() && (req.user.local.role === 'administrator')) {
        return next();
    }

    res.json({
        code: 400,
        data: {
            auth: false,
            data: {
                req: '',
                res: '',
                msg: 'Auth Failed,Please Sign in, And Try Again'
            }
        }
    });
}

module.exports = router;
