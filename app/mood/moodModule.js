/**
 * Created by thonatos on 15/1/10.
 */

var moodService = require('../common/service/moodService').moodService;

// Api

/*
 * {
 *  code:200/404/500
 *  data:{}
 * }
 *
 */
exports.Api = {
    get: function (req, res) {

        var mid = req.params.mid;

        moodService.get(mid, function (data) {

            res.json({
                pageTitle: data.post.name,
                pageContent: data
            });
        });
    },
    gets: function (req, res) {
        var perPageNum = req.params.perPageNum || 5,
            currentPage = req.params.currentPage || 1;

        moodService.gets(currentPage, perPageNum, function (data) {
            res.json(data);
        });
    },
    add: function (req, res) {

        var mood = {
            datetime: new Date(),
            author: req.body.author,
            content: req.body.content
        };

        console.log(mood);

        moodService.add(mood, function (data) {
            res.json(data);
        });

    },
    put: function (req, res) {

        var pid = req.params.pid;

        var post = {
            name: req.body.name,
            desc: req.body.desc,
            tags: req.body.tags,
            date: new Date(),
            author: req.body.author,
            content: req.body.content,
            category: req.body.category
        };

        moodService.put(pid, post, function (data) {
            res.json(data);
        });

    },
    del: function (req, res) {

        var pid = req.params.pid;

        console.log(pid);

        moodService.del(pid, function (data) {

            res.json(data);
        });

    }
};

// Controller
exports.Controller = {
    // Return HTML
    get: function (req, res) {

        var perPageNum = req.params.perPageNum || 5;
        var currentPage = req.params.currentPage || 1;

        moodService.getAll(currentPage, perPageNum, function (data) {

            res.render('mood/timeline', {
                pageTitle: 'Mood',
                pageContent: data
            });

        });

    }
};