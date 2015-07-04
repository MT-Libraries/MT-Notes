/**
 * Created by thonatos on 15/7/4.
 */

var wx = require('../utils/jweixin-1.0.0');

var Wechat = {

    create : function(bundleInterface, bundleProtected){
        var obj = {};

        var _interface = bundleInterface || {};
        var _protected = bundleProtected || {};

        _protected.init = function(options){

            var _options = options || {} ;

            wx.config({
                debug: true,
                appId: _options.appId,
                timestamp: _options.timestamp,
                nonceStr: _options.nonceStr,
                signature: _options.signature ,
                jsApiList: ['checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard']
            });

            wx.ready(function(){
                console.log('ready');

                var shareData = {
                    title: '微信JS-SDK Demo',
                    desc: '微信JS-SDK,帮助第三方为用户提供更优质的移动web服务',
                    link: 'http://demo.open.weixin.qq.com/jssdk/',
                    imgUrl: 'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0'
                };
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData);
            });


            wx.error(function (res) {
                alert(res.errMsg);
            });

        };


        _protected.getSignature = function(token){

            $.get('/api/wechat/signature/gen?access_token='+token ,function(data) {

                if(data && data.code === 200){

                    console.log(data);

                    _protected.init(data.data);

                }else{
                    console.log('err');
                }
            });
        };

        _protected.getToken = function(){

            $.get('/api/wechat/token/get',function(data) {

                if(data && data.code === 200){

                    console.log(data);

                    var _access_token = data.data.access_token;


                    _protected.getSignature(_access_token);

                }else{
                    console.log('err');
                }
            });

        };
        
        obj.init = function () {

            _protected.getToken();
        };

        return obj;
    }
};

exports.create = Wechat.create;