var express = require('express');
var router = express.Router();

var apiApi = require('../api/apiModule').Api;
var fmApi = require('../fm/fmModule').Api;
var moodApi = require('../mood/moodModule').Api;
var wechatApi = require('../api/wechatModule').Api;

/*
 * Show welcome message while path to root.
 * @return:   {msg:''}
 */

router.route('/')
    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to NOTES@MT!',
            ott: redis.client.get('name')
        });
    });
    
/*
 * Public Function
 * Return json object according to query string.
 * @return:   {}
 */

router.route('/wechat/signature')
    .get(wechatApi.checkSignature);

router.route('/wechat/signature/gen')
    .get(wechatApi.genSignature);

router.route('/wechat/token/get')
    .get(wechatApi.getToken);

router.route('/media/audio/:text')
    .get(apiApi.text2audio);

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
