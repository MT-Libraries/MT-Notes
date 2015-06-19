/**
 * Created by thonatos on 15/1/12.
 */

var Mood = require('../model/mood');

exports.moodService = {

    add: function (mood, callback) {

        var _mood = new Mood(mood);

        _mood.save(function (err) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
                return;
            }

            callback({
                code: 200,
                data: {
                    auth: true,
                    data: {
                        req: '/mood',
                        res: 'success',
                        msg: mood._id + " Added."
                    }
                }
            });

        });
    },
    put: function (mid, mood, callback) {

        Mood.findById(mid, function (err, oldMood) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
            }

            oldMood.author = mood.author;
            oldMood.content = mood.content;
            oldMood.datetime = mood.datetime;

            oldMood.save(function (err) {

                if (err) {
                    callback({
                        code: 500,
                        data: err
                    });
                }

                callback({
                    code: 200,
                    data: {
                        auth: true,
                        data: {
                            req: '/mood/' + mid,
                            res: 'success',
                            msg: mid + " Updated."
                        }

                    }
                });
            });
        });

    },
    del: function (mid, callback) {

        Mood.remove({
            _id: mid
        }, function (err, mood) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
            }

            callback({
                code: 200,
                data: {
                    auth: true,
                    data: {
                        req: '/mood/' + mid,
                        res: 'success',
                        msg: mid + " Removed."
                    }
                }
            });
        });

    },
    get: function (mid, callback) {

        Mood.findById(mid, function (err, mood) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
                return;
            }

            callback({
                code: 200,
                data: {
                    mood: mood
                }
            });
        });

    },
    gets: function (currentPage, perPageNum, callback) {

        var perPageNum = perPageNum;
        var currentPage = currentPage;

        Mood.count(function (err, totalRecords) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
            }

            Mood.find().skip(( currentPage - 1 ) * perPageNum).limit(perPageNum).sort('-date').exec(function (err, moods) {

                if (err) {
                    callback({
                        code: 500,
                        data: err
                    });
                    return;
                }

                var pageCount = ( totalRecords - totalRecords % perPageNum ) / perPageNum;
                pageCount = ( totalRecords > pageCount * perPageNum ) ? ( pageCount + 1 ) : pageCount;

                callback({
                    code: 200,
                    data: {
                        pageCount: pageCount,
                        currentPage: currentPage,
                        perPageNum: perPageNum,
                        moods: moods
                    }
                });
            });
        });
    }
};