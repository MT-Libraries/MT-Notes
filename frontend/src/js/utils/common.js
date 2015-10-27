/**
 * Created by thonatos on 15/1/12.
 */


exports.addBaseTag = function (url) {
    var _baseTag = document.createElement("base");
    _baseTag.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(_baseTag);
};