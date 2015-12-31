/**
 * Created by thonatos on 14/11/30.
 */

var fs = require('fs');
var path = require('path');

module.exports = function (configType, configEnv) {

    // SET CONF
    var CONFIG_TYPE = configType || '';
    var CONFIG_SUFFIX = '.json';
    var CONFIG_ENVIRONMENT = configEnv === true ? "develop" : "product";

    var CONFIG_FILE = path.join(process.cwd(), '/conf/' + CONFIG_TYPE + '_' + CONFIG_ENVIRONMENT + CONFIG_SUFFIX);
                          
    // READ CONF        
    if (fs.existsSync(CONFIG_FILE)) {
        console.log('## MT-NODE: load config file, ' + CONFIG_FILE);        
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
        
    } else {    
        return {};                   
    }   
};