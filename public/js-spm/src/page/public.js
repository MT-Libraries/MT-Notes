/**
 * Created by thonatos on 15/1/18.
 */

exports.init = function () {

    var updateBrowser = require('../components/update-browser').create('',false);
    updateBrowser.init();

    var toggleNav = require('../components/toggle-nav').create($('.nav-ul-toggle a'),$('.nav-ul'));
    toggleNav.init();

};