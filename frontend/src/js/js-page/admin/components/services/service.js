/**
 * Created by thonatos on 14-10-31.
 */

var service = angular.module('ASS.service', [
    'ASS.service.blogService',
    'ASS.service.moodService',
    'ASS.service.ajaxService'
]);

var blog = require('./blogService');
var mood = require('./moodService');
var ajax = require('./ajaxService');

module.exports = service;
