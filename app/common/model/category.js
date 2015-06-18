/**
 * Created by thonatos on 14-11-5.
 */

var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    desc:     String,
    value:     String,
    parentID:     String
});

module.exports = mongoose.model('Mood',categorySchema);