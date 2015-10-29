/**
 * Created by thonatos on 15/1/18.
 */

var loader;
var SVGLoader = require('../utils/SVGLoader');
var updateBrowser = require('../components/update-browser').create('',false);
    
$(document).ready(function(){  
      
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
        
        setTimeout(function(){
                loader.hide();
        },2000);
    } 
    
});