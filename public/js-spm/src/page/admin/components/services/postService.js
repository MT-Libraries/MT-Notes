/**
 * Created by thonatos on 14-11-8.
 */

var PRIVATE_API = '/user/post';
var PUBLIC_API = '/api/blog';

var cookieUtil = require('../../../../utils/cookie');

var postService = angular.module('ASS.service.postService', [])
    .factory('postService', ['ajaxService', function (ajaxService) {

        return ({
            add: add,
            del: del,
            rev: rev,
            get: get,
            getAll: getAll
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

            return ajaxService.post(PRIVATE_API, post);
        }

        function del(pid) {
            return ajaxService.del(PRIVATE_API + '/' + pid);
        }

        function rev(pid, post) {
            return ajaxService.put(PRIVATE_API + '/' + pid, post);
        }

        function get(pid) {
            return ajaxService.get(PUBLIC_API + '/post/' + pid);
        }

        function getAll(pager) {
            return ajaxService.get(PUBLIC_API + '/page/' + pager);
        }
    }]);


module.exports = postService;
