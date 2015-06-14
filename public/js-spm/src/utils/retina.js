/**
 * @fileOverview retina img adapter
 * created at Wed Jul 16 2014 20:34:39 GMT+0800 (CST)
 */


(function(){

    var Retina = {};

    Retina.RETINA_RATIO = {
        NORMAL: '1x',
        RETINA_2X: '2x'
    };
    var DATA_ENUM = {
        URL: 'data-retina-url',
        IMG_TYPE: 'data-img-type',
        DONE: 'data-retina-done'
    };

    var _filters = {};// filter map
    var _imgTypeConfigs = {};// img type config map
    var _platforms = {};// platform map
    var _currentPlatform;
    var _devicePixelRatio = getDevicePixelRatio();

    var processImg = function() {

        var allImgs = document.getElementsByTagName('img');

        for(var i = 0; i < allImgs.length; i++) {

            if(allImgs[i].getAttribute(DATA_ENUM.DONE) == 'true') {
                continue;
            }



            var url = allImgs[i].getAttribute(DATA_ENUM.URL);
            if(url) {
                var dataImgType = allImgs[i].getAttribute(DATA_ENUM.IMG_TYPE);

                if(_imgTypeConfigs[dataImgType]) {

                    var config = _imgTypeConfigs[dataImgType];

                    var filterResult = getFilter(config);

                    if(filterResult.filter) {
                        var filter = filterResult.filter;
                        var platform = filterResult.platform;

                        var result = filter(url, config[platform].base, config[platform][_devicePixelRatio]);

                        var defaultUrl;
                        if(config[platform]['default']) {
                            defaultUrl = filter(config[platform]['default'], config[platform].base, config[platform][_devicePixelRatio]);
                        }

                        setImg(allImgs[i], result, defaultUrl);
                    }
                }
            }

            allImgs[i].setAttribute(DATA_ENUM.DONE, true);

        }

    };

    // search for platform filter
    // if find currentPlatform filter, return
    // if not, look up to currenPlatform's parent recursively till one filter been found
    // if get to root, return undefind
    function getFilter(config) {
        var platform = _currentPlatform;

        var filter;
        if(config[platform]) {
            filter = _filters[config[platform].filter];
        }

        while(typeof filter !== 'function') {
            var parentPlatformKey = _platforms[platform].parent;

            if(!parentPlatformKey) break;

            platform = _platforms[parentPlatformKey].key;
            if(config[platform]) {
                filter = _filters[config[platform].filter];
            }
        }

        var result = {
            filter: filter,
            platform: platform
        };
        return result;
    }

    function setImg(obj, url, defaultUrl) {
            var img = new Image();
            img.src = url;

            if(img.complete) {
                obj.setAttribute('src', url);
                obj.setAttribute('style', '');
            } else {
                img.onload = function() {
                    obj.setAttribute('src', url);
                    obj.setAttribute('style', '');
                };
                img.onerror = function() {
                    setDefaultImg(obj, defaultUrl);
                };
            }
    }

    function setDefaultImg(obj, url) {
        if(!url) return;

        var img = new Image();
        img.src = url;

        if(img.complete) {
            obj.setAttribute('src', url);
            obj.setAttribute('style', '');
        } else {
            img.onload = function() {
                obj.setAttribute('src', url);
                obj.setAttribute('style', '');
            };
        }
    }

    // use media query to check for retina screen
    function getDevicePixelRatio() {

        var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5),' +
                         '(min--moz-device-pixel-ratio: 1.5), ' +
                         '(-o-min-device-pixel-ratio: 3/2), ' +
                         '(min-device-pixel-ratio: 1.5), ' +
                         '(min-resolution: 1.5dppx), ' +
                         '(min-resolution: 192dpi)';

        window.devicePixelRatio = window.devicePixelRatio ||
                                  window.screen.deviceXDPI / window.screen.logicalXDPI;
        if (window.devicePixelRatio >= 1.5) {
            return Retina.RETINA_RATIO.RETINA_2X;
        }

        if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
            return Retina.RETINA_RATIO.RETINA_2X;
        }

        return Retina.RETINA_RATIO.NORMAL;
    }

    // autoComplete config
    // params not been defined in `platform` object will
    // inherit value from parent object
    function autoCompleteConfig() {
        for(var i in _imgTypeConfigs) {
            var parentObj = _imgTypeConfigs[i];
            for(var j in _platforms) {
                var targetObj = parentObj[j];
                if(targetObj) {
                    for(var k in parentObj.public) {
                        if(targetObj[k] === undefined) {
                            targetObj[k] = parentObj.public[k];
                        }
                    }
                }
            }
        }
    }

    Retina.setFilters = function(filters) {
        _filters = filters;
    };
    Retina.setConfigs = function(currentPlatform, platforms, configs) {
        _currentPlatform = currentPlatform;
        _imgTypeConfigs = configs;
        _platforms = platforms;

        autoCompleteConfig();
    };

    // notify retina.js to update img tags
    // invoke when new html is added
    Retina.retinaUpdate = processImg;

    // update retina src
    Retina.modifyRetinaImg = function(target, src) {
        target.setAttribute(DATA_ENUM.URL, src);
        target.setAttribute(DATA_ENUM.DONE, false);
    };


    window.Retina = Retina;
})();
