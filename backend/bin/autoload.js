/**
 * Created by thonatos on 14/11/26.
 */

var app = require('../app');

var server = app.listen(app.get('port'), function() {
    console.log('## MT-NODE: listening on port ' + server.address().port + ',' + new Date());
});

