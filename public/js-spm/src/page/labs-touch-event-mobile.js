/**
 * Created by thonatos on 15/2/11.
 */

function initImg(callback) {

    function setImg(obj, url) {
        var img = new Image();
        img.src = url;

        if (img.complete) {
            obj.setAttribute('src', url);
            obj.style.display = '';
        } else {
            img.onload = function () {
                obj.setAttribute('src', url);
                obj.style.display = '';


            };
            img.onerror = function () {
                setDefaultImg(obj, url);
            };
        }
    }

    function setDefaultImg(obj, url) {
        if (!url) return;

        var img = new Image();
        img.src = url;

        if (img.complete) {
            obj.setAttribute('src', url);
            obj.style.display = '';
        } else {
            img.onload = function () {
                obj.setAttribute('src', url);
                obj.style.display = '';
            };
        }
    }

    var imgs = document.getElementsByTagName('img');

    for (var i = 0; i < imgs.length; i++) {
        setImg(imgs[i], imgs[i].getAttribute('src'));
    }

    if (callback) {
        callback();
    }

}

function initAnimation() {

    var animation = function (obj, fps, times, callback) {

        var runing = false;
        var handler = null;

        var step = 0;       //当前帧
        var steps = fps;
        var time = 0;       //当前第几轮

        var speed = 1000 / fps;      //间隔时间

        console.log(speed);


        function _play() {
            if (step >= steps) {
                step = 0;
                time++;
            }
            if (0 == times || time < times) {


                obj.css('top', (-225 * step) + 'px');

                step++;
            } else {
                control.stop();
                callback && callback();
            }
        }

        var control = {
            start: function () {
                if (!runing) {
                    runing = true;
                    step = time = 0;
                    handler = setInterval(_play, speed);
                }
                return this;
            }

            , stop: function (restart) {
                if (runing) {
                    runing = false;
                    if (handler) {
                        clearInterval(handler);
                        handler = null;
                    }
                    if (restart) {
                        obj.css('top', '0px');
                        step = 0;
                        time = 0;
                    }
                }
            }
            , dispose: function () {
                this.stop();
                //console.log('anim dispose');
            }
        };
        return control;
    };
    var anim = animation($('.img-ul'), 15 / 4, 5);
    anim.start();
}

exports.init = function () {

    var public = require('./public');
    public.init();

    var degreeX = 0;
    var degreeY = 0;

    //initImg(initAnimation());

    var touchListener = require('../utils/touchListener').create($('.box-3d'));

    touchListener.registerSwipeLeftCallback(function () {
        degreeY -= 120;
        translate('left',degreeX,degreeY);
    });

    touchListener.registerSwipeRightCallback(function () {
        degreeY += 120;
        translate('right',degreeX,degreeY);
    });

    touchListener.registerSwipeUpCallback(function () {
        degreeX -= 120;
        translate('up',degreeX,degreeY);
    });

    touchListener.registerSwipeDownCallback(function () {

        degreeX += 120;
        translate('down',degreeX,degreeY);
    });



    function translate(direction,x,y) {
        $('.direction span').html(direction);
        $('.degree-x span').html(x);
        $('.degree-y span').html(y);
        $('.box-3d .rectangle').css({
            'transform': 'rotateX('+ x +'deg)'+' rotateY('+ y +'deg)'
        });
    }

};