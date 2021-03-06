/**
 * Created by thonatos on 15/1/26.
 */

var request = require('request');
var fs = require('fs');
var path = require('path');

exports.fileService = {

    list: function (localPath) {

        var dir = path.join(process.cwd(), localPath);

        var walkSync = function (dir, filelist) {

            var files = fs.readdirSync(dir);
            var fileList = filelist || [];

            files.forEach(function (file) {
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    fileList = walkSync(path.join(dir, file), fileList);
                } else {

                    var stats = fs.statSync(path.join(dir, file));
                    var _file = {
                        name:file,
                        path:path.join(dir, file),
                        stats:stats
                    };

                    console.log(_file);

                    fileList.push(_file);

                }
            });

            return fileList;
        };

        return walkSync(dir, '');

    },
    upload: function (oPath,dPath,callback) {

            if(fs.existsSync(oPath)) {

                if(fs.existsSync(dPath)){

                    // Overwrite old file.

                    fs.unlink(dPath, function (err) {
                        if(err) {
                            throw err;
                        }

                        fs.rename(oPath,dPath,function(err){
                            if(err){
                                throw err;
                            }


                            callback({
                                code:200,
                                data:{
                                    msg:'Old file has been overwrote by new file.'
                                }
                            });
                        });

                    });

                }else{

                    fs.rename(oPath,dPath,function(err){
                        if(err){
                            throw err;
                        }

                        callback({
                            code:200,
                            data:{
                                msg:'Successful uploaded.'
                            }
                        });

                    });
                }

            }else{

                // Original file not exist

                callback({
                    code:500,
                    data:{
                        msg:'Upload failed. Please Try again.'
                    }
                });
            }

    },
    download: function (remoteUrl, localPath) {

        console.log(remoteUrl);

        var fileName = remoteUrl.split('/');
        var fileSave = fileName[fileName.length - 1];
        var result = false;

        var writeStream = fs.createWriteStream(path.join(process.cwd(), localPath, fileSave));

        writeStream.on('close', function () {
            console.log('#CLOSE:', 'writeStream End');
            result = 'Write File Success !';
        });

        request.get(remoteUrl)
            .on('response', function (response) {
                console.log('#ON:', response.statusCode, response.headers['content-type']);
            })
            .on('err', function (err) {
                console.log('#ERR ', err);
            })
            .pipe(writeStream)
            .on('end', function () {
                return result;
            });
    }
};