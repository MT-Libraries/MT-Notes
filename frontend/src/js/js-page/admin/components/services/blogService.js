/**
 * Created by thonatos on 14-11-8.
 */


var API_PATH = '/api/blog';

var cookieUtil = require('../../../../utils/cookie');

var blogService = angular.module('ASS.service.blogService', [])
    .factory('blogService', ['ajaxService', function (ajaxService) {

        return ({
            add: add,
            del: del,
            rev: rev,
            get: get,
            gets: gets
        });

        function add(post) {

            post.author = getAuthor();

            function getAuthor() {

                var _cookie = JSON.parse(cookieUtil.getItem('MT.User').replace('j:',''));

                if(_cookie && _cookie.email){

                    console.log(_cookie.email);
                    return _cookie.email;
                }else{
                    return 'anonymous';
                }
            }

            return ajaxService.post(API_PATH + '/post', post);
        }

        function del(pid) {
            return ajaxService.del(API_PATH + '/post/' + pid);
        }

        function rev(pid, post) {
            return ajaxService.put(API_PATH + '/post/' + pid, post);
        }

        function get(pid) {
            return ajaxService.get(API_PATH + '/get/' + pid);
        }

        function gets(pager) {
            return ajaxService.get(API_PATH + '/gets/' + pager);
        }
    }]);


module.exports = blogService;
