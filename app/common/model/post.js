/**
 * Created by thonatos on 14-11-5.
 */

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    name:       String,
    desc:       String,
    tags:       Array,
    date:       { type: Date, default: Date.now },
    author:     String,
    content:    String,
    category:   String
});

module.exports = mongoose.model('Post',postSchema);