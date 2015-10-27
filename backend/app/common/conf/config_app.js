/**
 * Created by thonatos on 14/11/30.
 */

var fs = require('fs');
var path = require('path');

module.exports = function (configType , info) {

    var _configType = configType || '' ;
    var _info = info || 'default';

    var _init = function(config,info){

        // CONFIG_LOCAL
        var CONFIG_PRODUCT = path.join(process.cwd(), '/conf/'+config+'_product.json');
        var CONFIG_DEVELOP = path.join(process.cwd(), '/conf/'+config+'_develop.json');

        // LOG_MSG
        var LOG_MSG = {
            main: '## MT-NOTES: ' + config + ', ' + info,
            success: 'Find Private Config File, Use the Config.',
            failed:  'Cant Find Private Config File, Use default Config.'
        };

        // READ CONF
        var privateConf = {};

        if (fs.existsSync(CONFIG_PRODUCT)) {

            console.log(LOG_MSG.main + ', ' + LOG_MSG.success);
            privateConf = JSON.parse(fs.readFileSync(CONFIG_PRODUCT, 'utf-8'));

        } else {

            console.log(LOG_MSG.main + ', ' + LOG_MSG.failed);
            privateConf = JSON.parse(fs.readFileSync(CONFIG_DEVELOP, 'utf-8'));
        }

        return privateConf;
    };

    return _init(_configType,_info);

};

