/**
 *
 * webpack.config.
 *
 * @project     localhost_insta360
 * @datetime    18:22 - 15/9/10
 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
 * @copyright   Thonatos.Yang <https://www.thonatos.com>
 *
 */

'use strict';

module.exports = {
    entry: {     
        'index-fm': './src/js/js-page/index-fm.js',
        'index-mood': './src/js/js-page/index-mood.js',
        'public': './src/js/js-page/public.js',                   
        'retina': './src/js/utils/retina.js'
    },
    output: {
        path: __dirname + "/public/js/dev",
        filename: '[name].js'
    }
};