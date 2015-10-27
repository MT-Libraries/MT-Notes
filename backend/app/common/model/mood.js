/**
 * Created by thonatos on 14-11-5.
 */

var mongoose = require('mongoose');

var moodSchema = new mongoose.Schema({
    author:     String,
    content:    String,
    datetime:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mood',moodSchema);