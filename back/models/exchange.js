//schema - création de la collection Exchange ainsi que ces champs 

const mongoose = require('mongoose');

var Exchange = mongoose.model('Exchange', {
    name: {type: String},
    num_market_pairs: {type: Number},
    last_updated: {type: String},
    volume_24h: {type: String},
    volume_7d: {type: String},
    volume_30d: {type: String},
    date: {type: String}

});

module.exports = {Exchange};

