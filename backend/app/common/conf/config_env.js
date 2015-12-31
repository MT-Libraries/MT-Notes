/**
 *
 * config_env.
 *
 * @project     localhost_service.insta360.com
 * @datetime    15:54 - 15/12/1
 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
 * @copyright   Thonatos.Yang <https://www.thonatos.com>
 *
 */

var path = require('path');
var fs = require('fs');

var APP_RUN = 'app_run.json';
var ENV_ENUM = 'env_enum.json';

module.exports= function () {

    var CONFIG_RUN =  path.join(process.cwd(),APP_RUN);
    var CONFIG_ENUM = path.join(process.cwd(),ENV_ENUM);

    // READ CONF

    var env = {};
    var envEnum = {};

    if (fs.existsSync(CONFIG_ENUM)) {
        envEnum = JSON.parse(fs.readFileSync(CONFIG_ENUM, 'utf-8'));
    } else {

        var err = new Error('config err');
        console.log(err);
    }

    if (fs.existsSync(CONFIG_RUN)) {

        var _tmp = JSON.parse(fs.readFileSync(CONFIG_RUN, 'utf-8'));
        env = _tmp.run || 'dev';

    } else {
        env = 'dev';
    }

    return envEnum[env];
};