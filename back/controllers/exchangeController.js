const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const https = require('https');


var { Exchange } = require('../models/exchange.js');
var { One_Exchange } = require('../models/one-exchange.js');



function httpsRequest(params) {
    return new Promise(function (resolve, reject) {
        var req = https.request(params, function (res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}

// Liste tous les exchanges
// equivaut à une requette => localhost:3000/exchange/list    
router.get('/list', async function (req, res) {

    console.log(req.query.list_exchange.toLowerCase());

    //https://web-api.coinmarketcap.com/v1/exchange/listings/latest?aux=num_market_pairs,date_launched&convert=USD&limit=5&sort=volume_24h_adjusted&sort_dir=desc&start=1
    //https://web-api.coinmarketcap.com/v1/exchange/quotes/latest?slug=binance,kraken,bitfinex,bittrex,bkex
    var params_cmc_exchange = {
        host: 'web-api.coinmarketcap.com',
        path: '/v1/exchange/quotes/latest?slug=' + req.query.list_exchange.toLowerCase(),
        method: 'GET'
    };

    var tab_exchange;

    const get_cmc_exchange = await httpsRequest(params_cmc_exchange);




    // Utilisation de Object.values car les keys de get_cmc_exchange.data ne sont pas des nombres mais les noms des exchanges et impossible de faire un map direct sur eux
    tab_exchange = Object.values(get_cmc_exchange.data).map(item => {
        return {
            name: item.name,
            num_market_pairs: item.num_market_pairs,
            last_updated: item.last_updated,
            volume_24h: item.quote.USD.volume_24h,
            volume_7d: item.quote.USD.volume_7d,
            volume_30d: item.quote.USD.volume_30d
        };
    });
    console.log(tab_exchange);
    res.send(tab_exchange)





    // Exchange.find((err, docs) => {
    //     if (!err) {
    //         res.send(docs);
    //         //console.log(docs);
    //     }
    //     else {
    //         console.log('Erreur dans la récupération de la liste des exchanges : ' + JSON.stringify(err, undefined, 2));
    //     }
    // });
});



// Enregistre les valeurs entrantes dans MongoDB
router.post('/', (req, res) => {

    // on va créer un nouvel objet Exchange avec pour paramètres, les données présentes dans la requete qui sont envoyé en format json
    console.log(req.body);
        var exchange = new Exchange({
            name: req.body.name,
            num_market_pairs: req.body.num_market_pairs,
            last_updated: req.body.last_updated,
            volume_24h: req.body.volume_24h,
            volume_7d: req.body.volume_7d,
            volume_30d: req.body.volume_30d,
            date: new Date()


        });
        console.log("exchange : ", exchange);

        // On enregistre dans mongoDB le nouvel objet avec .save
        exchange.save((err, doc) => {
            if (!err) {
                //console.log(doc)
                res.send(doc);
            }
            else {
                console.log('Erreur dans la sauvegarde des valeurs : ' + JSON.stringify(err, undefined, 2));
            }
        });
    
});

// Requette dans mongoDB
router.get('/list/mongoDB', (req, res) => {

    Exchange.find((err, docs) => {
        if (!err) {
            res.send(docs);
            //console.log(docs);
        }
        else {
            console.log('Erreur dans la récupération de toutes les valeurs concernants les exchanges dans mongoDB : ' + JSON.stringify(err, undefined, 2));
        }
    });


});


//-----------------------------------------------------------------------------------------------------------
// equivaut à une requette => localhost:3000/exchange/one-exchange    
router.get('/one-exchange', async function (req, res) {

    console.log("Ici - - - -- ");
    console.log("req : ", req.query.exchange);
    // https://web-api.coinmarketcap.com/v1/exchange/market-pairs/latest?aux=num_market_pairs,category,fee_type,market_url,currency_name,currency_slug,effective_liquidity&convert=USD,BTC&limit=400&market_status=unverified&slug=bkex&start=1
    // https://web-api.coinmarketcap.com/v1/exchange/market-pairs/latest?slug=kraken&limit=5000&aux=market_url
    var params_cmc_exchange = {
        host: 'web-api.coinmarketcap.com',
        path: '/v1/exchange/market-pairs/latest?limit=5000&aux=market_url&slug='+ req.query.exchange.toLowerCase(),
        method: 'GET'
    };

    var tab_one_exchange;

    const get_cmc_one_exchange = await httpsRequest(params_cmc_exchange);

    tab_one_exchange = get_cmc_one_exchange.data.market_pairs.map(item => {
        return {
            market_name: req.query.exchange.toLowerCase(),
            market_pair_name: item.market_pair_base.exchange_symbol,
            price: item.quote.exchange_reported.price,
            market_pair_devise: item.market_pair_quote.exchange_symbol,
            market_url: item.market_url
        };
    });
    console.log(tab_one_exchange);
    res.send(tab_one_exchange)

});

// Enregistre les valeurs entrantes dans MongoDB
router.post('/one-exchange/crypto/', (req, res) => {

    // on va créer un nouvel objet RECORD avec pour paramètres, les données présentes dans la requete qui sont envoyé en format json
    console.log(req.body);
        var one_exchange = new One_Exchange({
            market_name: req.body.market_name,
            market_pair_name: req.body.market_pair_name,
            price: req.body.price,
            market_pair_devise: req.body.market_pair_devise,
            market_url: req.body.market_url,
            date: new Date()

        });
        console.log("one_exchange : ", one_exchange);

        // On enregistre dans mongoDB le nouvel objet avec .save
        one_exchange.save((err, doc) => {
            if (!err) {
                //console.log(doc)
                res.send(doc);
            }
            else {
                console.log('Erreur dans la sauvegarde des valeurs : ' + JSON.stringify(err, undefined, 2));
            }
        });
    
});

// Requette dans mongoDB
router.get('/one-exchange/crypto/mongoDB', (req, res) => {

    One_Exchange.find({"market_name":req.query.exchange.toLowerCase()},(err, docs) => {
        if (!err) {
            res.send(docs);
            console.log(docs);
        }
        else {
            console.log('Erreur dans la récupération de toutes les valeurs concernants les cryptos liès à un exchange dans mongoDB : ' + JSON.stringify(err, undefined, 2));
        }
    }).limit(200).sort({$natural:-1});


});

module.exports = router;