/**
 * Created by thonatos on 15/1/12.
 */

var Post = require('../model/post');

exports.postService = {

    add: function (post, callback) {

        var _post = new Post(post);

        console.log(_post);

        _post.save(function (err) {

            if (err) {
                callback(err);
                return;
            }

            callback({
                auth: true,
                data: {
                    req: '/post',
                    res: 'success',
                    msg: post.name + " Added."
                }
            });

        });
    },
    put: function (pid, post, callback) {

        Post.findById(pid, function (err, oldPost) {

            if (err) {
                callback(err);
            }

            oldPost.name = post.name;
            oldPost.desc = post.desc;
            oldPost.tags = post.tags;
            oldPost.date = post.date;
            oldPost.author = post.author;
            oldPost.content = post.content;

            oldPost.save(function (err) {

                if (err) {
                    callback(err);
                }

                callback({
                    auth: true,
                    data: {
                        req: '/post/' + pid,
                        res: 'success',
                        msg: post.name + " Updated."
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
                callback(err);
            }

            callback({
                auth: true,
                data: {
                    req: '/post/' + pid,
                    res: 'success',
                    msg: pid + " Removed."
                }
            });
        });

    },
    get: function (pid, callback) {

        Post.findById(pid, function (err, post) {

            if (err) {
                callback(err);
                return;
            }

            callback({
                post: post
            });
        });

    },
    getAll: function (currentPage, perPageNum, callback) {

        var perPageNum = perPageNum;
        var currentPage = currentPage;

        Post.count(function (err, totalRecords) {

            if (err) {
                callback(err);
            }

            Post.find().skip(( currentPage - 1 ) * perPageNum).limit(perPageNum).sort('-date').exec(function (err, posts) {

                if (err) {
                    callback(err);
                    return;
                }

                var pageCount = ( totalRecords - totalRecords % perPageNum ) / perPageNum;
                pageCount = ( totalRecords > pageCount * perPageNum ) ? ( pageCount + 1 ) : pageCount;

                callback({
                    pageCount: pageCount,
                    currentPage: currentPage,
                    perPageNum: perPageNum,
                    posts: posts
                });
            });
        });
    }
};