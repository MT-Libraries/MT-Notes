/**
 * Created by thonatos on 15/4/30.
 * Thanks : @Moon (http://moonlib.com/606.html)
 */

var request = require('request');

var curlGet = function (url, method,callback) {

    var options = {
        url: url,
        headers: {
            refer: "http://music.163.com/",
            Cookie: "appver=1.5.0.75771"
        },
        json:true,
        method: method
    };

    request(options, function (err, response,json) {

        if(!err && response.statusCode == 200) {
            callback(false,json);
        }else{
          callback(true,{
              msg:"Something Wrong."
          });
        }

    });

};

exports.fmService = {

    getListInfo:function(playlistId,callback){
        var url = "http://music.163.com/api/playlist/detail?id="+playlistId;
        curlGet(url,"GET",function(err,data) {
            //Todo
            if(!err){
                callback(data);
            }else{
                callback({
                    msg:'cant get data'
                });
            }
        });
    },
    getMusicInfo:function(musicId,callback){
        var url = "http://music.163.com/api/song/detail/?id="+musicId+"&ids=%5B"+musicId+"%5D";
        curlGet(url,"GET",function(err,data) {
            //Todo
            if(!err){
                console.log(data);
                callback(data);
            }
        });
    },
    getMusicLyric:function(musicId,callback){
        var url = "http://music.163.com/api/song/lyric?os=pc&id="+musicId+"&lv=-1&kv=-1&tv=-1";
        curlGet(url,"GET",function(err,data) {
            //Todo
            if(!err){
                console.log(data);
                callback(data);
            }
        });
    },
    getMvInfo:function(mvId,callback){
        var url = "http://music.163.com/api/mv/detail?id="+mvId+"&type=mp4";
        curlGet(url,"GET",function(err,data) {
            //Todo
            if(!err){
                console.log(data);
                callback(data);
            }
        });
    }
};