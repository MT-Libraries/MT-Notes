var crypto = require('crypto');
var request = require('request');
var moment = require('moment');
var redis = require('redis');

var CONFIG_APP = require('../common/conf/config_app')('api', 'module_api');

exports.Api = {

    checkSignature: function (req, res) {

        var WECHAT_CONFIG = CONFIG_APP.weixin;

        var signature = req.query.signature;
        var timestamp = req.query.timestamp;
        var nonce = req.query.nonce;
        var echostr = req.query.echostr;

        var shasum = crypto.createHash('sha1');
        var arr = [WECHAT_CONFIG.token, timestamp, nonce].sort();
        shasum.update(arr.join(''));

        if (shasum.digest('hex') === signature) {
            res.send(echostr);
        } else {
            res.send('err');
        }
    },
    getToken: function (req, res) {

        var WECHAT_CONFIG = CONFIG_APP.weixin;

        var _protected = {};

        _protected.localStore = function () {

            var client = redis.createClient();
            client.unref();
            client.hgetall('weixin', function (err, response) {

                    // Connect Err
                    if (err) {

                        console.log('Redis connect err:', err);
                        _protected.remoteStore();
                        return;

                    } else {

                        // Connect Successful
                        if (response) {
                            // not null

                            //console.log('Redis connected,response not null,',response);

                            if (moment().diff(response.start, 'seconds') > response.expires_in) {

                                client.del('weixin', function (err, reply) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    console.log(reply);
                                });

                                _protected.remoteStore();

                            } else {
                                res.json({code: 200, data: response});
                            }

                        } else {

                            console.log('response null');
                            _protected.remoteStore();

                        }

                    }
                }
            );
        };

        _protected.remoteStore = function () {

            var client = redis.createClient();

            var _authUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + WECHAT_CONFIG.appid + '&secret=' + WECHAT_CONFIG.appSec;

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
                        client.hmset('weixin', json, function (err, response) {

                            if (err) {
                                console.log('Redis err: ', err);
                                return;
                            }

                            console.log('Redis store: ', response);
                        });

                        res.json({
                            code: 200,
                            data: json
                        });

                    } else {

                        res.json({
                            code: 500,
                            data: json
                        });
                    }

                } else {

                    // Connect Failed
                    res.json({
                        code: 500,
                        data: {
                            msg: 'Remote server connect Failed.'
                        }
                    });
                }

            });

        };

        _protected.localStore();

    },
    genSignature: function (req, res) {

        var WECHAT_CONFIG = CONFIG_APP.weixin;

        var _Access_Token = req.query.access_token;
        var _url = req.query.url || req.protocol + '://' + req.hostname + req.originalUrl;

        var _protected = {};

        _protected.localStore = function () {

            var client = redis.createClient();
            client.unref();
            client.hgetall('jsApiTicket', function (err, response) {

                    // Connect Err
                    if (err) {
                        console.log('Redis connect err:', err);
                        _protected.remoteStore();
                        return;
                    } else {

                        // Connect Successful
                        if (response) {
                            // not null
                            // console.log('Redis connected,response not null,',response);

                            if (moment().diff(response.start, 'seconds') > response.expires_in) {

                                client.del('jsApiTicket', function (err, reply) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    console.log(reply);
                                });

                                _protected.remoteStore();

                            } else {

                                res.json({code: 200, data: _protected.gen(response)});

                            }

                        } else {
                            console.log('response null');
                            _protected.remoteStore();
                        }

                    }
                }
            );
        };

        _protected.remoteStore = function () {

            var client = redis.createClient();

            var _jsApiTicketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + _Access_Token + '&type=jsapi';

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
                        client.hmset('jsApiTicket', json, function (err, response) {

                            if (err) {
                                console.log('Redis err: ', err);
                            }

                            console.log('Redis store: ', response);
                        });

                        // res.json({code:200,data:json});

                        res.json({code: 200, data: _protected.gen(response)});

                    } else {

                        res.json({code: 500, data: json});
                    }

                } else {

                    // Connect Failed
                    res.json({
                        code: 500,
                        data: {
                            msg: 'Remote server connect Failed.'
                        }
                    });
                }

            });

        };

        _protected.gen = function (signArr) {

            var _suffix = '';

            if (req.query.isappinstalled !== undefined) {
                _suffix = "&isappinstalled=" + req.query.isappinstalled;
            } else {
                _suffix = '';
            }

            // console.log('_suffix:'+_suffix+_suffix.length);

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
                url: _url + _suffix
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

    }

};