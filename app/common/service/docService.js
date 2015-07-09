/**
 * Created by thonatos on 14/11/27.
 */


var request = require('request');

exports.docService = {

    get: function (queryString, callback) {

        var _options = {
            url: queryString.url,
            headers: {
                'Authorization': 'token ' + queryString.access_token,
                'User-Agent': 'MT.Server',
                'Connection': 'keep-alive'
            },
            json:true,
            method: 'GET'
        };

        request(_options, function (err, response, json) {

            if (!err && response.statusCode === 200) {

                // Connect Successful
                callback({code:200, data:json});

            } else {

                // Connect Failed
                callback({
                    code:500,
                    data:{
                        msg:'Remote server connect Failed.'
                    }
                });
            }

        });

    }
};


