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

        moodService.get(mid, function (response) {
            res.json(response);
        });
    },
    gets: function (req, res) {
        var perPageNum = req.params.perPageNum || 5,
            currentPage = req.params.currentPage || 1;

        moodService.gets(currentPage, perPageNum, function (response) {
            res.json(response);
        });
    },
    add: function (req, res) {

        var mood = {
            datetime: new Date(),
            author: req.body.author,
            content: req.body.content
        };

        moodService.add(mood, function (response) {
            res.json(response);
        });

    },
    put: function (req, res) {

        var mid = req.params.mid;

        var mood = {
            datetime: new Date(),
            author: req.body.author,
            content: req.body.content
        };

        moodService.put(mid, mood, function (response) {
            res.json(response);
        });

    },
    del: function (req, res) {

        var mid = req.params.mid;

        moodService.del(mid, function (response) {
            res.json(response);
        });

    }
};