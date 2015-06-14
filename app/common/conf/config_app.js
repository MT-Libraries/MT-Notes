/**
 * Created by thonatos on 14/11/30.
 */

var fs = require('fs');
var path = require('path');


// CONFIG_LOCAL
var CONFIG_PRODUCT = path.join(process.cwd(), '/conf/config_product.json');
var CONFIG_DEVELOP = path.join(process.cwd(), '/conf/config_develop.json');

module.exports = function (from) {

    // LOG_MSG
    var LOG_MSG = {
        success: '## MT-NOTES: ' + from + ', Find Private Config File, Use the Config.',
        failed: '## MT-NOTES: ' + from + ', Cant Find Private Config File, Use default Config.'
    };

    // READ CONF
    var privateConf = {};

    if (fs.existsSync(CONFIG_PRODUCT)) {

        console.log(LOG_MSG.success);
        privateConf = JSON.parse(fs.readFileSync(CONFIG_PRODUCT, 'utf-8'));

    } else {

        console.log(LOG_MSG.failed);
        privateConf = JSON.parse(fs.readFileSync(CONFIG_DEVELOP, 'utf-8'));
    }

    return privateConf;
};

