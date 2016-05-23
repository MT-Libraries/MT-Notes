/**
 * Created by thonatos on 15/1/18.
 */

var updateBrowser = require('../components/update-browser').create('',false);
var SVGLoader = require('../utils/SVGLoader');
var loader;
    
$(document).ready(function(){

    console.log("\n\n" +
        "%c面朝大海,春暖花开。\n\n"+
        "%c遇到你,真的很开心,(づ｡◕‿‿◕｡)づ\n\n"+
        "秀恩爱的正确姿势是怎样?——当然就是酱紫喽!\n\n"
    ,"color:#ff2d00","color:#57B382;");
    // 浏览版本检测    
    updateBrowser.init();

    // 浏览器版本是否低于IE8    
    var lessThenIE = function () {
        var UA = navigator.userAgent,
            isIE = UA.indexOf('MSIE') > -1,
            v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
        return v < 10;
    }();    
                   
    if (lessThenIE) {        
        $('#loader').hide();        
    } else {
        loader = new SVGLoader(document.getElementById('loader'), { speedIn: 300, easingIn: mina.easeinout });
        loader.show();      
    } 
        
});

$(window).load(function() {
    setTimeout(function() {
        loader.hide();
    },2000);
});  