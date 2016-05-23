/**
 * Created by thonatos on 14/12/15.
 */

var BASE_URL = '/user/admin/';

var init = function () {

    // SET BASE_TAG
    var util = require('../../utils/common');
    util.addBaseTag(BASE_URL);

    //docCookies = require('../utils/cookie');
    //
    //console.log(docCookies.getItem("MT.User"));

    // SET ANGULAR
    var AngularSeedSpm = angular.module('ASS', [
        'ui.router',
        'ASS.blog',
        'ASS.mood',
        'ASS.service'
    ]);

    var blog = require("./blog/blog");
    var mood = require("./mood/mood");
    var service = require('./components/services/service');

    AngularSeedSpm.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/blog');
    }]);

    angular.bootstrap(document, ['ASS']);
};

exports.init = init;
