/**
 * Created by thonatos on 15/1/26.
 */

var path = require('path');
var fileService = require('../common/service/fileService').fileService;
var upyunService = require('../common/service/upyunService').upyunService;

exports.Controller = {

    list: function (req, res) {
        var fileList = fileService.list('static');
        res.send(fileList);
    },
    upload: function (req,res) {

        var rootPath = process.cwd();

        var obj = req.files.filename;
        var tmpPath = path.join(rootPath,obj.path);
        var newPath = path.join(rootPath,'/static/',obj.name);

        fileService.upload(tmpPath,newPath, function (response) {

            if(response.code === 200){
                res.send(response.data);
            }
        });


    },
    download : function (req, res) {
        var remoteUrl = req.body.url;
        fileService.download(remoteUrl,'static');
        res.send('Start Download File ... You can find it from /file/');
    },
    remote: function (req, res) {
        //upyunService.upload('/roms','',path.join(process.cwd(),'static/logo-green-orange.png'));

        // 先让我好好想想这个功能到底是用来做什么，T.T，帮别人下东西没问题，可是云存储收费的啊~
        res.send('Remote Down && Upload to Upyun .');
    }
};