/**
 * Created by thonatos on 15/1/10.
 */

var postService = require('../common/service/postService').postService;

// Api
exports.Api = {
    get: function (req, res) {

        var pid = req.params.pid;

        postService.get(pid, function (response) {

            res.json(response);
        });
    },
    gets: function (req, res) {
        var perPageNum = req.params.perPageNum || 5,
            currentPage = req.params.currentPage || 1;

        postService.gets(currentPage, perPageNum, function (response) {

            res.json(response);

        });
    },
    add: function (req, res) {

        var post = {
            name: req.body.name,
            desc: req.body.desc,
            tags: req.body.tags,
            date: new Date(),
            author: req.body.author,
            content: req.body.content,
            category: req.body.category
        };

        postService.add(post, function (response) {

            res.json(response);
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

        postService.put(pid, post, function (response) {
            res.json(response);
        });

    },
    del: function (req, res) {

        var pid = req.params.pid;

        postService.del(pid, function (response) {

            res.json(response);
        });

    }
};

// Controller
exports.Controller = {
    get: function (req, res) {

        var pid = req.params.pid;

        postService.get(pid, function (response) {

            if(response.code === 200) {

                res.render('blog/single', {
                    pageTitle: response.data.post.name,
                    pageContent: response.data
                });

            }else{

                res.send('Error .');
            }
        });

    },
    gets: function (req, res) {

        var perPageNum = req.params.perPageNum || 5;
        var currentPage = req.params.currentPage || 1;

        postService.gets(currentPage, perPageNum, function (response) {

            if(response.code === 200) {


                res.render('blog/multi', {
                    pageTitle: 'Blog',
                    pageContent: response.data
                });

            }else{

                res.send('Error .');
            }



        });

    }
};