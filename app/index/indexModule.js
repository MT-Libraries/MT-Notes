/**
 * Created by thonatos on 15/4/30.
 */


// Controller
exports.Controller = {
    index:function (req, res) {
        res.render('index/index',
            {
                pageTitle: 'Index'
            });
    },
    about:function (req, res) {
        res.render('index/about',
            {
                pageTitle: 'About'
            });
    },
    fm:function (req, res) {
        var playListId = req.params.plId || 2096362;
        res.render('index/fm',
            {
                pageTitle: 'FM',
                playList:playListId
            });
    },
    mood: function (req, res) {
        res.render('index/mood',
            {
                pageTitle: 'Mood'
            });
    }
};