/**
 * Created by thonatos on 14-11-14.
 */

var ajaxService = angular.module('ASS.service.ajaxService', [])
    .factory('ajaxService', ['$http', function ($http) {

        return ({
            post: post,
            get: get,
            del: del,
            put: put
        });

        function post(url, data) {
            var promise = $http.post(url, data).then(function (response) {
                return response.data;
            });
            return promise;
        }

        function get(url) {
            var promise = $http.get(url).then(function (response) {
                return response.data;
            });
            return promise;
        }

        function del(url) {
            var promise = $http.delete(url).then(function (response) {
                return response.data;
            });
            return promise;
        }

        function put(url, data) {
            var promise = $http.put(url, data).then(function (response) {
                return response.data;
            });
            return promise;
        }
    }]);

module.exports = ajaxService;


