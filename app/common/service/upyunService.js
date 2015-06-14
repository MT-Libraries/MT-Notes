/**
 * Created by thonatos on 15/2/3.
 */

var path = require('path');

var CONFIG_APP = require('../conf/config_app')('UPYUN').auth.upyun;

var UPYUN = require('ez-upyun').Upyun;
var upyun = new UPYUN(CONFIG_APP.bucket, CONFIG_APP.operator, CONFIG_APP.password);

exports.upyunService = {

    getUsage: function () {
        upyun.getUsage(function (err, result) {

            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }

        });
    },
    upload: function (remoteSavePath, remoteSaveName, localFilePath) {

        var localFile = localFilePath.split('/');
        var localFileName = localFile[localFile.length - 1];

        var remoteSavePath = remoteSavePath || '/';
        var remoteSaveName = remoteSaveName || localFileName;

        var remoteFilePath = path.join(remoteSavePath, remoteSaveName);


        // 上传文件
        console.log(remoteSavePath,localFilePath);

        upyun.upload(localFilePath,remoteFilePath, function(err, result) {
            if(err){
                console.log(err);
            }else{
                console.log(result);
            }
        });


    },
    delete: function () {

    }

};