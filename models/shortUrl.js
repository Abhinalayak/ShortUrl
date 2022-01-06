const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        unique : true
    }
})

const UrlModel = mongoose.model('urlshort', UrlSchema);

module.exports = { UrlModel };