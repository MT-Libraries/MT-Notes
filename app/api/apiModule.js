/**
 * Created by thonatos on 15/6/27.
 */

var crypto = require('crypto');
var request = require('request');
var CONFIG_APP = require('../common/conf/config_app')('api','module_api');

var auth_token = '';
var auth_flag = false;

exports.Api = {
    text2audio: function (req, res) {

        var BAIDU_CONFIG = CONFIG_APP.baidu.yuyin;
        var _text = req.params.text;
        var _protected = {};

        _protected.initAuth = function (ak, sk ,callback) {

            var _authUrl = 'http://openapi.baidu.com/oauth/2.0/token' +
                '?grant_type=client_credentials' +
                '&client_id=' + ak +
                '&client_secret=' + sk;

            var options = {
                url: _authUrl,
                json: true,
                method: 'GET'
            };

            request(options, function (err, response, json) {

                if (!err && response.statusCode === 200) {

                    // Connect Successful

                    if (json.access_token) {

                        auth_token = json.access_token;
                        auth_flag = true;

                        callback(false,{
                            code:200,
                            data:json
                        });

                    } else {

                        auth_flag = false;

                        callback(true,{
                            code:500,
                            data:json
                        });
                    }

                } else {

                    // Connect Failed

                    auth_flag = false;

                    callback(true,{
                        code:500,
                        data:{
                            msg:'Connect Failed.'
                        }
                    });
                }

            });

        };

        _protected.get = function (text) {

            var _apiUrl = 'http://tsn.baidu.com/text2audio';

            var _params = {
                idx: 1,
                tex: text,
                lan: "zh",
                tok: auth_token,
                ctp: 1,
                cuid: "6c:40:08:ab:4c:b2",
                spd: 5,
                pit: 5,
                vol: 5,
                per: 0
            };

            var _url = _apiUrl + '?'+'idx=' + _params.idx + '&tex=' + _params.tex + '&lan=' + _params.lan + '&tok=' + _params.tok + '&ctp=' + _params.ctp + '&cuid=' + _params.cuid  + '&spd=' + _params.ctp + '&pit=' + _params.pit + '&vol=' + _params.vol + '&per=' + _params.per;


            request.get(encodeURI(_url))
                .on('response', function(response) {
                    console.log(response.statusCode,response.headers['content-type']);
                })
                .on('error',function(err){
                    res.json({
                        code: 500,
                        data: JSON.parse(err)
                    });
                })
                .on('end',function(){
                    console.log('request end');
                })
                .pipe(res);

        };


        if (auth_flag) {
            _protected.get(_text);
        } else {


            _protected.initAuth(BAIDU_CONFIG.API_Key, BAIDU_CONFIG.Secret_Key, function (error,response) {

                if(error){
                    res.json(response);
                }else{
                    _protected.get(_text);
                }

            });
        }

    },
    wechat:{
        checkSignature:function(req,res){

            var WECHAT_CONFIG = CONFIG_APP.weixin;

            var signature = req.params.signature;
            var timestamp = req.params.timestamp;
            var nonce = req.params.nonce;
            var echostr = req.params.echostr;

            var shasum = crypto.createHash('sha1');
            var arr = [WECHAT_CONFIG.token, timestamp, nonce].sort();
            shasum.update(arr.join(''));

            //return shasum.digest('hex') === signature;

            if(shasum.digest('hex') === signature){
                res.send(echostr);
            }else {
                res.send('err');
            }
        }
    }
};