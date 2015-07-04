/**
 * Created by thonatos on 15/6/27.
 */

var crypto = require('crypto');
var request = require('request');
var moment = require('moment');
var redis = require('redis');

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

    wechat: function () {

        var obj = {};

        obj.checkSignature = function (req,res){

            // http://localhost:8084/api/wechat/signature?signature=c175cd41c98cc358f59a9664b5f3910df74d244e&echostr=2127777743056099306&timestamp=1435980616&nonce=425529478

            var WECHAT_CONFIG = CONFIG_APP.weixin;

            var signature = req.query.signature;
            var timestamp = req.query.timestamp;
            var nonce = req.query.nonce;
            var echostr = req.query.echostr;

            var shasum = crypto.createHash('sha1');
            var arr = [WECHAT_CONFIG.token, timestamp, nonce].sort();
            shasum.update(arr.join(''));

            if(shasum.digest('hex') === signature){
                res.send(echostr);
            }else {
                res.send('err');
            }
        };

        obj.getToken = function (req,res) {

            var WECHAT_CONFIG = CONFIG_APP.weixin;

            var _protected = {};

            _protected.localStore = function(){

                var client = redis.createClient();
                    client.unref();
                    client.hgetall('weixin',function(err,response){

                            // Connect Err
                            if(err){

                                console.log('Redis connect err:',err);
                                _protected.remoteStore();
                                return;

                            }else{

                                // Connect Successful
                                if(response){
                                    // not null
                                    console.log('Redis connected,response not null,',response);

                                    if(moment().diff(response.start,'seconds') > response.expires_in){

                                        client.del('weixin', function(err, reply) {
                                            if(err){
                                                console.log(err);
                                                return;
                                            }
                                            console.log(reply);
                                        });

                                        _protected.remoteStore();

                                    }else{
                                        res.json({code:200,data:response});
                                    }

                                }else{

                                    console.log('response null');
                                    _protected.remoteStore();

                                }

                            }
                        }
                    );
            };

            _protected.remoteStore = function(){

                var client = redis.createClient();

                var _authUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+WECHAT_CONFIG.appid+'&secret='+WECHAT_CONFIG.appSec;

                var _options = {
                    url: _authUrl,
                    json: true,
                    method: 'GET'
                };

                request(_options, function (err, response, json) {

                    if (!err && response.statusCode === 200) {

                        // Connect Successful
                        if (json.access_token) {

                            json.start = moment().format();

                            client.unref();
                            client.hmset('weixin',json, function (err,response) {

                                if(err){
                                    console.log('Redis err: ',err);
                                    return;
                                }

                                console.log('Redis store: ',response);
                            });

                            res.json({
                                code:200,
                                data:json
                            });

                        } else {

                            res.json({
                                code:500,
                                data:json
                            });
                        }

                    } else {

                        // Connect Failed
                        res.json({
                            code:500,
                            data:{
                                msg:'Remote server connect Failed.'
                            }
                        });
                    }

                });

            };

            _protected.localStore();

        };

        obj.genSignature = function (req,res) {

            var WECHAT_CONFIG = CONFIG_APP.weixin;

            var _Access_Token = req.query.access_token;
            var _url = req.query.url || req.protocol+'://'+req.hostname+req.originalUrl;

            var _protected = {};

            _protected.localStore = function(){

                var client = redis.createClient();
                    client.unref();
                    client.hgetall('jsApiTicket',function(err,response){

                            // Connect Err
                            if(err){
                                console.log('Redis connect err:',err);
                                _protected.remoteStore();
                                return;
                            }else{

                                // Connect Successful
                                if(response){
                                    // not null
                                    console.log('Redis connected,response not null,',response);

                                    if(moment().diff(response.start,'seconds') > response.expires_in){

                                        client.del('jsApiTicket', function(err, reply) {
                                            if(err){
                                                console.log(err);
                                                return;
                                            }
                                            console.log(reply);
                                        });

                                        _protected.remoteStore();

                                    }else{

                                        res.json({code:200,data:_protected.gen(response)});

                                    }

                                }else{
                                    console.log('response null');
                                    _protected.remoteStore();
                                }

                            }
                        }
                    );
            };

            _protected.remoteStore = function(){

                var client = redis.createClient();

                var _jsApiTicketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+_Access_Token+'&type=jsapi';

                var _options = {
                    url: _jsApiTicketUrl,
                    json: true,
                    method: 'GET'
                };

                request(_options, function (err, response, json) {

                    if (!err && response.statusCode === 200) {

                        // Connect Successful
                        if (json.ticket) {

                            json.start = moment().format();
                            client.unref();
                            client.hmset('jsApiTicket',json, function (err,response) {

                                if(err){
                                    console.log('Redis err: ',err);
                                }

                                console.log('Redis store: ',response);
                            });

                            // res.json({code:200,data:json});

                            res.json({code:200,data:_protected.gen(response)});

                        } else {

                            res.json({code:500, data:json});
                        }

                    } else {

                        // Connect Failed
                        res.json({
                            code:500,
                            data:{
                                msg:'Remote server connect Failed.'
                            }
                        });
                    }

                });

            };

            _protected.gen = function(signArr){

                var _suffix = '';

                if(req.query.isappinstalled !== undefined){
                    _suffix = "&isappinstalled="+req.query.isappinstalled;
                }else{
                    _suffix = '';
                }

                console.log('_suffix:'+_suffix+_suffix.length);

                var createNonceStr = function () {
                    return Math.random().toString(36).substr(2, 15);
                };

                var raw = function (args) {
                    var keys = Object.keys(args);
                    keys = keys.sort();
                    var newArgs = {};
                    keys.forEach(function (key) {
                        newArgs[key.toLowerCase()] = args[key];
                    });

                    var string = '';
                    for (var k in newArgs) {
                        string += '&' + k + '=' + newArgs[k];
                    }
                    string = string.substr(1);
                    return string;
                };

                var _result = {
                    jsapi_ticket: signArr.ticket,
                    nonceStr: createNonceStr(),
                    timestamp: moment(signArr.start).unix(),
                    url: _url+_suffix
                };

                // var url = _url,
                //    nonceStr = createNonceStr(),
                //    timestamp = moment(signArr.start).unix(),
                //    jsapi_ticket = signArr.ticket;
                //
                // var _string = 'jsapi_ticket='+ _result.jsapi_ticket +'&noncestr='+ _result.nonceStr + '&timestamp='+ _result.timestamp + '&url='+ _result.url;

                var _string = raw(_result);
                var _signature = crypto.createHash('sha1').update(_string).digest('hex');

                _result.appId = WECHAT_CONFIG.appid;
                _result.signature = _signature;

                return _result;
            };

            _protected.localStore();

        };

        return obj;
    }
};