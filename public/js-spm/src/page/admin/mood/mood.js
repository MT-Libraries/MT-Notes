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
        console.log(mid);
        moodService.del(mid).then(function (response) {
            console.log(response);

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

            console.log(response);

        });
    }

}]);

mood.controller('moodAddCtrl', ['$scope', 'moodService', function ($scope, moodService) {

    $scope.title = 'Add a new mood';

    $scope.mood = {};

    $scope.submitMoodForm = function (Valid) {
        if (Valid) {

            console.log($scope.mood);
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
        console.log(response);
        $scope.mood = response.pageContent.mood;
    });

    $scope.submitMoodForm = function (Valid) {
        if (Valid) {

            console.log($scope.mood);
            moodService.rev(mid, $scope.mood).then(function (response) {
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

module.exports = mood;