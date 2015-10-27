/**
 * Created by thonatos on 15/1/12.
 */

var blog = angular.module('ASS.blog', ['ui.router']);

blog.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('blog', {
            url: '/blog',
            views: {
                '': {
                    templateUrl: '/public/js-spm/src/page/admin/blog/layout.html',
                    controller: 'blogCtrl'
                },
                'side@blog': {
                    templateUrl: '/public/js-spm/src/page/admin/blog/blog.side.html'
                },
                'main@blog': {
                    templateUrl: '/public/js-spm/src/page/admin/blog/blog.main.html',
                    controller: 'blogMainCtrl'
                }
            }
        })
        .state('blog.list', {
            url: '/list',
            views: {
                'main@blog': {
                    templateUrl: '/public/js-spm/src/page/admin/blog/blog.list.html',
                    controller: 'blogListCtrl'
                }
            }
        })
        .state('blog.add', {
            url: '/add',
            views: {
                'main@blog': {
                    templateUrl: '/public/js-spm/src/page/admin/blog/blog.add.html',
                    controller: 'blogAddCtrl'
                }
            }
        })
        .state('blog.rev', {
            url: '/rev/:pid',
            views: {
                'main@blog': {
                    templateUrl: '/public/js-spm/src/page/admin/blog/blog.rev.html',
                    controller: 'blogRevCtrl'
                }
            }
        });
}]);

blog.controller('blogCtrl', ['$scope', function ($scope) {

    $scope.menuList = [
        { name: 'List post', url: 'blog.list' },
        { name: 'Add Post', url: 'blog.add' }
    ];

}]);

blog.controller('blogMainCtrl', ['$scope', 'blogService', function ($scope, blogService) {

    $scope.title = 'blog.Administrator';

}]);

blog.controller('blogListCtrl', ['$scope', '$state', 'blogService', function ($scope, $state, blogService) {


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
        blogService.del(pid).then(function (response) {
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

        blogService.gets(_currentPage).then(function (response) {

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

blog.controller('blogAddCtrl', ['$scope', 'blogService', function ($scope, blogService) {

    $scope.title = 'Add a new post';

    $scope.post = {};

    $scope.submitPostForm = function (Valid) {
        if (Valid) {

            console.log($scope.post);
            blogService.add($scope.post).then(function (response) {
                console.log(response);

                alert('success');
                $scope.post = {};
            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

blog.controller('blogRevCtrl', ['$scope', '$stateParams', 'blogService', function ($scope, $stateParams, blogService) {

    $scope.title = 'Revision an old post';

    var pid = $stateParams.pid;

    blogService.get(pid).then(function (response) {
        console.log(response);
        $scope.post = response.data.post;
    });

    $scope.submitPostForm = function (Valid) {
        if (Valid) {

            console.log($scope.post);
            blogService.rev(pid, $scope.post).then(function (response) {
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

module.exports = blog;