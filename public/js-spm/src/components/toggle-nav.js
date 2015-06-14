/**
 * Created by thonatos on 15/1/18.
 */


var toggleNav = {
    create: function ($toggle, $container) {

        var obj = {};

        var active = false;

        obj.init = function () {

            $toggle.click(function (e) {


                if(active){
                    $container.fadeOut();
                }else{
                    $container.fadeIn();
                }

                active = !active;

                return false;
            });
        };

        return obj;
    }
};

exports.create = toggleNav.create;

