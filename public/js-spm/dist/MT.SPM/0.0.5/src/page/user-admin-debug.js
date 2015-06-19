define("MT.SPM/0.0.5/src/page/user-admin-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/12/15.
 */

var BASE_URL = '/user/admin/';

var init = function () {

    // SET BASE_TAG
    var util = require("MT.SPM/0.0.5/src/utils/common-debug");
    util.addBaseTag(BASE_URL);

    //docCookies = require('../utils/cookie');
    //
    //console.log(docCookies.getItem("MT.User"));

    // SET ANGULAR
    var AngularSeedSpm = angular.module('ASS', [
        'ui.router',
        'ASS.post',
        'ASS.mood',
        'ASS.service'
    ]);

    var post = require("MT.SPM/0.0.5/src/page/admin/post/post-debug");
    var mood = require("MT.SPM/0.0.5/src/page/admin/mood/mood-debug");
    var service = require("MT.SPM/0.0.5/src/page/admin/components/services/service-debug");

    AngularSeedSpm.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/post');
    }]);

    angular.bootstrap(document, ['ASS']);
};

exports.init = init;

});
define("MT.SPM/0.0.5/src/utils/common-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/12.
 */


exports.addBaseTag = function (url) {
    var _baseTag = document.createElement("base");
    _baseTag.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(_baseTag);
};
});
define("MT.SPM/0.0.5/src/page/admin/post/post-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/12.
 */

var post = angular.module('ASS.post', ['ui.router']);

post.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('post', {
            url: '/post',
            views: {
                '': {
                    templateUrl: '/public/js-spm/src/page/admin/post/layout.html',
                    controller: 'postCtrl'
                },
                'side@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.side.html'
                },
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.main.html',
                    controller: 'postMainCtrl'
                }
            }
        })
        .state('post.list', {
            url: '/list',
            views: {
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.list.html',
                    controller: 'postListCtrl'
                }
            }
        })
        .state('post.add', {
            url: '/add',
            views: {
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.add.html',
                    controller: 'postAddCtrl'
                }
            }
        })
        .state('post.rev', {
            url: '/rev/:pid',
            views: {
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.rev.html',
                    controller: 'postRevCtrl'
                }
            }
        });
}]);

post.controller('postCtrl', ['$scope', function ($scope) {

    $scope.menuList = [
        {name: 'List Post', url: 'post.list'},
        {name: 'Add Post', url: 'post.add'}
    ];

}]);

post.controller('postMainCtrl', ['$scope', 'postService', function ($scope, postService) {

    $scope.title = 'Post.Administrator';

}]);

post.controller('postListCtrl', ['$scope','$state','postService', function ($scope,$state, postService) {


    var _currentPage = 1;

    $scope.title = 'List all posts';

    render();

    $scope.prevPage = function () {
        if (_currentPage > 1) {
            _currentPage--;
            render();
        }
    };

    $scope.nextPage = function () {
        if ($scope.pageCount > _currentPage) {
            _currentPage++;
            render();
        }
    };

    $scope.del = function (pid) {
        console.log(pid);
        postService.del(pid).then(function (response) {
            console.log(response);

            if (response.auth) {
                alert(response.data.data.msg);
                $state.reload();

            } else {
                alert(response.data.data.msg);
            }
        })
    };

    function render() {

        postService.gets(_currentPage).then(function (response) {

            $scope.post = response.data.posts;
            $scope.pageCount = response.data.pageCount;

            if ($scope.pageCount > _currentPage) {
                $scope.Pager = true;
                $scope.Next = true;
            } else {
                $scope.Next = false;
            }

            if (_currentPage > 1) {
                $scope.Prev = true;
            } else {
                $scope.Prev = false;
            }

            console.log(response);

        });
    }

}]);

post.controller('postAddCtrl', ['$scope', 'postService', function ($scope, postService) {

    $scope.title = 'Add a new post';

    $scope.categories = ['Default', 'Document'];

    $scope.post = {};
    $scope.post.category = $scope.categories[0];

    $scope.submitPostForm = function (Valid) {
        if (Valid) {

            console.log($scope.post);
            postService.add($scope.post).then(function (response) {
                console.log(response);

                alert('success');
                $scope.post = {};
            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

post.controller('postRevCtrl', ['$scope', '$stateParams', 'postService', function ($scope, $stateParams, postService) {

    $scope.title = 'Revision an old post';
    $scope.categories = ['Default', 'Document'];

    var pid = $stateParams.pid;

    postService.get(pid).then(function (response) {
        console.log(response);
        $scope.post = response.data.pageContent.post;
    });

    $scope.submitPostForm = function (Valid) {
        if (Valid) {

            console.log($scope.post);
            postService.rev(pid, $scope.post).then(function (response) {
                console.log(response);

                if (response.data.auth) {
                    alert(response.data.data.msg);
                } else {
                    alert(response.data.data.msg);
                }

            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

module.exports = post;
});
define("MT.SPM/0.0.5/src/page/admin/mood/mood-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/12.
 */

var mood = angular.module('ASS.mood', ['ui.router']);

mood.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('mood', {
            url: '/mood',
            views: {
                '': {
                    templateUrl: '/public/js-spm/src/page/admin/mood/layout.html',
                    controller: 'moodCtrl'
                },
                'side@mood': {
                    templateUrl: '/public/js-spm/src/page/admin/mood/mood.side.html'
                },
                'main@mood': {
                    templateUrl: '/public/js-spm/src/page/admin/mood/mood.main.html',
                    controller: 'moodMainCtrl'
                }
            }
        })
        .state('mood.list', {
            url: '/list',
            views: {
                'main@mood': {
                    templateUrl: '/public/js-spm/src/page/admin/mood/mood.list.html',
                    controller: 'moodListCtrl'
                }
            }
        })
        .state('mood.add', {
            url: '/add',
            views: {
                'main@mood': {
                    templateUrl: '/public/js-spm/src/page/admin/mood/mood.add.html',
                    controller: 'moodAddCtrl'
                }
            }
        })
        .state('mood.rev', {
            url: '/rev/:mid',
            views: {
                'main@mood': {
                    templateUrl: '/public/js-spm/src/page/admin/mood/mood.rev.html',
                    controller: 'moodRevCtrl'
                }
            }
        });
}]);

mood.controller('moodCtrl', ['$scope', function ($scope) {

    $scope.menuList = [
        {name: 'List Mood', url: 'mood.list'},
        {name: 'Add Mood', url: 'mood.add'}
    ];

}]);

mood.controller('moodMainCtrl', ['$scope', 'moodService', function ($scope, moodService) {

    $scope.title = 'Mood.Administrator';

}]);

mood.controller('moodListCtrl', ['$scope','$state','moodService', function ($scope,$state, moodService) {

    $scope.title = 'List all moods';

    var _currentPage = 1;

    render();

    $scope.prevPage = function () {
        if (_currentPage > 1) {
            _currentPage--;
            render();
        }
    };

    $scope.nextPage = function () {
        if ($scope.pageCount > _currentPage) {
            _currentPage++;
            render();
        }
    };

    $scope.del = function (mid) {

        //console.log(mid);

        moodService.del(mid).then(function (response) {

            // console.log(response);

            if (response.data.auth) {
                alert(response.data.data.msg);
                $state.reload();

            } else {
                alert(response.data.data.msg);
            }
        })
    };

    function render() {

        moodService.gets(_currentPage).then(function (response) {

            if(response.code === 200){
                $scope.moods = response.data.moods;
                $scope.pageCount = response.data.pageCount;
            }

            if ($scope.pageCount > _currentPage) {
                $scope.Pager = true;
                $scope.Next = true;
            } else {
                $scope.Next = false;
            }

            if (_currentPage > 1) {
                $scope.Prev = true;
            } else {
                $scope.Prev = false;
            }

            // console.log(response);

        });
    }

}]);

mood.controller('moodAddCtrl', ['$scope', 'moodService', function ($scope, moodService) {

    $scope.title = 'Add a new mood';

    $scope.mood = {};

    $scope.submitMoodForm = function (Valid) {
        if (Valid) {

            // console.log($scope.mood);
            moodService.add($scope.mood).then(function (response) {
                console.log(response);

                alert('success');
                $scope.mood = {};
            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

mood.controller('moodRevCtrl', ['$scope', '$stateParams', 'moodService', function ($scope, $stateParams, moodService) {

    $scope.title = 'Revision an old mood';

    var mid = $stateParams.mid;

    moodService.get(mid).then(function (response) {
        if(response.code === 200){
            $scope.mood = response.data.mood;
        }else{
            $scope.mood = {
                author:'none',
                content:response.data.status,
                datetime:new Date()
            }
        }

    });

    $scope.submitMoodForm = function (Valid) {
        if (Valid) {

            // console.log($scope.mood);

            moodService.rev(mid, $scope.mood).then(function (response) {

                if (response.data.auth) {
                    alert(response.data.data.msg);
                } else {
                    alert(response.data.data.msg);
                }

            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

module.exports = mood;
});
define("MT.SPM/0.0.5/src/page/admin/components/services/service-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14-10-31.
 */

var service = angular.module('ASS.service', [
    'ASS.service.postService',
    'ASS.service.moodService',
    'ASS.service.ajaxService'
]);

var post = require("MT.SPM/0.0.5/src/page/admin/components/services/postService-debug");
var mood = require("MT.SPM/0.0.5/src/page/admin/components/services/moodService-debug");
var ajax = require("MT.SPM/0.0.5/src/page/admin/components/services/ajaxService-debug");

module.exports = service;

});
define("MT.SPM/0.0.5/src/page/admin/components/services/postService-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14-11-8.
 */


var API_PATH = '/api/blog';

var cookieUtil = require("MT.SPM/0.0.5/src/utils/cookie-debug");

var postService = angular.module('ASS.service.postService', [])
    .factory('postService', ['ajaxService', function (ajaxService) {

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


module.exports = postService;

});
define("MT.SPM/0.0.5/src/utils/cookie-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/17.
 */

/*\
 |*|
 |*|  :: cookies.js ::
 |*|
 |*|  A complete cookies reader/writer framework with full unicode support.
 |*|
 |*|  Revision #1 - September 4, 2014
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 |*|  https://developer.mozilla.org/User:fusionchess
 |*|
 |*|  This framework is released under the GNU Public License, version 3 or later.
 |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 |*|
 |*|  Syntaxes:
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path[, domain]])
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/

var docCookies = {
    getItem: function (sKey) {
        if (!sKey) { return null; }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        if (!sKey) { return false; }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};

module.exports = docCookies;
});
define("MT.SPM/0.0.5/src/page/admin/components/services/moodService-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14-11-8.
 */


var API_PATH = '/api/moods';

var cookieUtil = require("MT.SPM/0.0.5/src/utils/cookie-debug");

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

});
define("MT.SPM/0.0.5/src/page/admin/components/services/ajaxService-debug", [], function(require, exports, module){
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



});
