/**
 * Created by thonatos on 14/12/6.
 */

var Modal = {
    create: function(bundleProtected){
        var _interface = {};
        var _protected = {};

        var obj = require("../components/component").create(_interface,_protected);

        obj.init = function(){
            _protected.init();
        };

        _interface.init = function(){
            console.log("Model _interface init");
        };

        return obj;
    }
};

exports.create = Modal.create;