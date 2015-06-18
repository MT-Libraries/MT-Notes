/**
 * Created by thonatos on 14-10-31.
 */

var service = angular.module('ASS.service', [
    'ASS.service.postService',
    'ASS.service.moodService',
    'ASS.service.ajaxService'
]);

var post = require('./postService');
var mood = require('./moodService');
var ajax = require('./ajaxService');

module.exports = service;
