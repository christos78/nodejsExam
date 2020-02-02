const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost', {
    dbName: "scrapper", useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('Connexion réussie à MongoDB...');
    }
    else {
        console.log('Echec de connexion : ' + JSON.stringify(err, undefined, 2));
    }
}).catch(e => console.log(e));

module.exports = mongoose;