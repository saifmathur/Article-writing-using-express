const mongoose = require('mongoose');


//schema
let articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true }
});

var Article = module.exports = mongoose.model('Article', articleSchema);