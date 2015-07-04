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
                debug: false,
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

                var $img = '<div style="display: none;"><img src="http://www.thonatos.com/public/images/other/kira.png">';
                $('body').prepend($img);

                //var shareData = {
                //    title: '微信JS-SDK Demo',
                //    desc: '微信JS-SDK,帮助第三方为用户提供更优质的移动web服务',
                //    link: 'http://demo.open.weixin.qq.com/jssdk/',
                //    imgUrl: 'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0'
                //};
                //wx.onMenuShareAppMessage(shareData);
                //wx.onMenuShareTimeline(shareData);
            });


            wx.error(function (res) {
                alert(res.errMsg);
            });

        };


        _protected.getSignature = function(token){

            var _url = window.location.href.split('#')[0];

            $.get('/api/wechat/signature/gen?access_token='+token+'&url='+ _url ,function(data) {

                if(data && data.code === 200){

                    _protected.init(data.data);

                }else{
                    console.log('getSignature err, we will try again in 10 seconds.');

                    setTimeout(_protected.getSignature(token),10000);
                }
            });
        };

        _protected.getToken = function(){

            $.get('/api/wechat/token/get',function(data) {

                if(data && data.code === 200){

                    _protected.getSignature(data.data.access_token);

                }else{

                    console.log('getToken err, we will try again in 10 seconds.');

                    setTimeout(_protected.getToken,10000);
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