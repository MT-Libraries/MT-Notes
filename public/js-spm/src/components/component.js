/**
 * Created by thonatos on 14/12/6.
 */

var Component = {
    create : function(bundleInterface, bundleProtected){
        var obj = {};

        var _interface = bundleInterface || {};
        var _protected = bundleProtected || {};

        _protected.init = function(asyn,param){
            console.log("Component _protected init");
            _interface.init(param);
        };

        return obj;
    }
};

exports.create = Component.create;