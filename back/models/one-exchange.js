//schema - création de la collection Exchange ainsi que ces champs 

const mongoose = require('mongoose');

var One_Exchange = mongoose.model('One_Exchange', {
    market_name: {type: String},
    market_pair_name: {type: String},
    price: {type: Number},
    market_pair_devise: {type: String},
    market_url: {type: String},
    date: {type: String}            


});

module.exports = {One_Exchange};

