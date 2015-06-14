/**
 * Created by thonatos on 14/12/12.
 */

var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
    value:      String,
    start:      String,
    length:       String
});

module.exports = mongoose.model('Token',tokenSchema);