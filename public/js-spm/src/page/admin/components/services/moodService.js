/**
 * Created by thonatos on 14-11-8.
 */


var API_PATH = '/api/moods';

var cookieUtil = require('../../../../utils/cookie');

var moodService = angular.module('ASS.service.moodService', [])
    .factory('moodService', ['ajaxService', function (ajaxService) {

        return ({
            add: add,
            del: del,
            rev: rev,
            get: get,
            gets: gets
        });

        function add(mood) {

            mood.author = getAuthor();

            function getAuthor() {

                var _cookie = JSON.parse(cookieUtil.getItem('MT.User').replace('j:',''));

                if(_cookie && _cookie.email){

                    console.log(_cookie.email);
                    return _cookie.email;
                }else{
                    return 'anonymous';
                }
            }

            return ajaxService.post(API_PATH + '/mood', mood);
        }

        function del(mid) {
            return ajaxService.del(API_PATH + '/mood/' + mid);
        }

        function rev(mid, mood) {
            return ajaxService.put(API_PATH + '/mood/' + mid, mood);
        }

        function get(mid) {
            return ajaxService.get(API_PATH + '/get/' + mid);
        }

        function gets(pager) {
            return ajaxService.get(API_PATH + '/gets/' + pager);
        }
    }]);


module.exports = moodService;
