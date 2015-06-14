/**
 * Created by thonatos on 15/4/30.
 */

var fmService = require('../common/service/fmService').fmService;

exports.fmController = {
    
    // Return Json
    get: function (req, res) {
        fmService.getMusicInfo(req.params.musicId, function (data) {
            console.log(data);
            res.json(data);
        });

    },
    getPlayList:function(req,res) {
        var playListId = req.params.plId || 2096362;
        fmService.getListInfo(playListId,function(data) {
            res.json(data);
        }) ;  
    }
};