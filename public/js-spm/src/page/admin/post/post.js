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

    $scope.title = 'List all posts';

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

    $scope.del = function (pid) {
        console.log(pid);
        postService.del(pid).then(function (response) {
            console.log(response);

            if (response.auth) {
                alert(response.data.msg);
                $state.reload();

            } else {
                alert(response.data.msg);
            }
        })
    };

    function render() {

        postService.getAll(_currentPage).then(function (response) {

            $scope.post = response.posts;
            $scope.pageCount = response.pageCount;

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
        $scope.post = response.pageContent.post;
    });

    $scope.submitPostForm = function (Valid) {
        if (Valid) {

            console.log($scope.post);
            postService.rev(pid, $scope.post).then(function (response) {
                console.log(response);

                if (response.auth) {
                    alert(response.data.msg);
                } else {
                    alert(response.data.msg);
                }

            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

module.exports = post;