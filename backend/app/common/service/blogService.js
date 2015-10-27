/**
 * Created by thonatos on 15/1/12.
 */

var Post = require('../model/post');

exports.blogService = {

    add: function (post, callback) {

        var _post = new Post(post);

        console.log(_post);

        _post.save(function (err) {

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
                        req: '/post',
                        res: 'success',
                        msg: post.name + " Added."
                    }
                }
            });

        });
    },
    put: function (pid, post, callback) {

        Post.findById(pid, function (err, oldPost) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
            }

            oldPost.name = post.name;
            oldPost.desc = post.desc;
            oldPost.tags = post.tags;
            oldPost.date = post.date;
            oldPost.author = post.author;
            oldPost.content = post.content;

            oldPost.save(function (error) {

                if (error) {
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
                            req: '/post/' + pid,
                            res: 'success',
                            msg: post.name + " Updated."
                        }

                    }
                });
            });
        });

    },
    del: function (pid, callback) {

        Post.remove({
            _id: pid
        }, function (err, post) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
            }

            callback({
                code: 200, data: {
                    auth: true,
                    data: {
                        req: '/post/' + pid,
                        res: 'success',
                        msg: pid + " Removed."
                    }
                }
            });
        });

    },
    get: function (pid, callback) {

        Post.findById(pid, function (err, post) {

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
                    post: post
                }
            });
        });

    },
    gets: function (_currentPage, _perPageNum, callback) {

        var perPageNum = _perPageNum;
        var currentPage = _currentPage;

        Post.count(function (err, totalRecords) {

            if (err) {
                callback({
                    code: 500,
                    data: err
                });
            }

            Post.find().skip(( currentPage - 1 ) * perPageNum).limit(perPageNum).sort('-date').exec(function (err, posts) {

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
                        posts: posts
                    }
                });
            });
        });
    }
};