/**
 * Created by thonatos on 15/4/30.
 */


// Controller
exports.Controller = {
    index:function (req, res) {
        res.locals.layout = 'index/_layout';
        res.render('index/index',
            {
                title: 'Index'
            });
    },
    fm:function (req, res) {
        res.locals.layout = 'index/_layout';
        var playListId = req.params.plId || 80546135 || 43600664 || 2096362;
        res.render('index/fm',
            {
                title: 'FM',
                playList:playListId
            });
    },
    mood: function (req, res) {
        res.locals.layout = 'index/_layout';
        res.render('index/mood',
            {
                title: 'Mood'
            });
    }
};