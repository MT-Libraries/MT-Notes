/**
 * @fileOverview retina config
 * @author Max
 * created at 2014-11-12 17:28
 */

(function(){

    var Retina = window.Retina;

    // define filters
    Retina.setFilters({
        'normal': function(url, base, ratio) {
            var result;

            var pieces = url.split('.');
            pieces[pieces.length - 2] += ratio.param;

            result = pieces.join('.');

            return result;
        },
        'svg-to-others': function(url, base, ratio) {
            var result;

            var pieces = url.split('/');
            var file = pieces[pieces.length - 1];
            var filePieces = file.split('.');
            filePieces[filePieces.length - 1] = base.postfix;
            file = filePieces.join('.');
            pieces[pieces.length - 1] = ratio.param + '/' + file;

            result = pieces.join('/');

            return result;
        },
        'svg': function(url, base, ratio) {
            return url;
        }
    });

    // define config const
    var CONFIG_TYPE = {
        SVG: 'svg'
    };
    // define configs
    var configs = {};

    configs[CONFIG_TYPE.SVG] = {
        public: {
            base: {
                postfix: 'png'
            }
        }
    };
    configs[CONFIG_TYPE.SVG].desktop = {
        filter: 'svg'
    };
    configs[CONFIG_TYPE.SVG].mobile = {
        filter: 'svg'
    };
    configs[CONFIG_TYPE.SVG]['desktop-svg-not-supported'] = {
        filter: 'svg-to-others',
        '1x': {
            param: '1x'
        },
        '2x': {
            param: '1x'
        }
    };
    configs[CONFIG_TYPE.SVG]['mobile-svg-not-supported'] = {
        filter: 'svg-to-others',
        '1x': {
            param: '1x'
        },
        '2x': {
            param: '1x'
        }
    };

    // define platform
    var platform = {
        'desktop': {
            key: 'desktop'
        },
        'mobile': {
            key: 'mobile'
        },
        'desktop-svg-not-supported': {
            key: 'desktop-svg-not-supported',
            parent: 'desktop'
        },
        'mobile-svg-not-supported': {
            key: 'mobile-svg-not-supported',
            parent: 'mobile'
        }
    };

    Retina.setConfigs(detectPlatform(), platform, configs);

    Retina.retinaUpdate();

    // platform detect
    function detectPlatform() {
        var result;
        IS_MOBILE_PLATFORM = false;
        if(!!IS_MOBILE_PLATFORM) {
            result = 'mobile';
        } else {
            if(navigator.userAgent.indexOf('MSIE 8.0') != -1) {
                result = 'desktop-svg-not-supported';
            } else {
                result = 'desktop';
            }
        }

        return result;
    }
})();
