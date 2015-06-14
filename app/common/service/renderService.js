/**
 * Created by thonatos on 14/11/30.
 */

var marked = require('marked');

exports.renderService = {

    renderMarkdown: function (json, t) {

        var _raw = '';
        var _html = '';

        if (t === 'C') {

            if (json.data.file) {
                _raw = json.data.file.data.toString('utf8');
                _html = marked(_raw);
            } else {
                _html = 'Wrong';
            }

        } else if (t === 'G') {

            if (json.content) {
                _raw = new Buffer(json.content, json.encoding).toString('utf8');
                _html = marked(_raw);
            } else {
                _html = json.message + ' . ' + json.documentation_url;
            }

        } else {

            _html = 'Wrong Type';
        }

        return _html;
    }
};

