/**
 * Created by thonatos on 14/11/26.
 */

var http = require('http');
var https = require('https');
var fs = require('fs');
var app = require('../app');

//var options = {
//    key: fs.readFileSync(app.get('ssl').key),
//    cert: fs.readFileSync(app.get('ssl').cert)
//};

console.log('## APP: ' + 'Server(http) listening on port ' + app.get('port') + ',' + new Date());
//console.log('## APP: ' + 'Server(https) listening on port ' + app.get('ssl').port + ',' + new Date());

http.createServer(app).listen(app.get('port'));
//https.createServer(options,app).listen(app.get('ssl').port);

//var server = app.listen(app.get('port'), function () {
//    console.log('## MT-NOTES: ' + 'MT.Server listening on port ' + server.address().port + ',' + new Date());
//});

