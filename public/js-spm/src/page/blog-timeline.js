/**
 * Created by thonatos on 15/6/12.
 */


exports.init = function () {


    var public = require('./public');
    public.init();

    var blogTimeLine = null;

    var timeline = require('../utils/timeline');

    blogTimeLine = timeline('.timeline',{
        item   : '.item',
        margin : 60, //左右之间的间距
        top    : 20 ,  //距离上一个item的间距
        minTop : 10,  //如在手机下显示，可以将上下间距适当缩小
        resize : true, //监听窗口变化
        minScreen : 640 //当窗口小于640时，单列显示
    });

    blogTimeLine.render();

};