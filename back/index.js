// rules

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const { mongoose } = require('./db.js');

var exchangeController = require('./controllers/exchangeController.js');



const app = express(); 
app.use(bodyParser.json());

app.use(cors());



app.listen(3000, () => console.log('Serveur lancé sur le port 3000'));

app.use('/exchange', exchangeController);

