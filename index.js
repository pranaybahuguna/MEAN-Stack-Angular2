const express = require('express');
const app = express();
const router = express.Router();
var mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise; 
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Could not connect to Database :', err);
    }
    else{
        console.log('Connected to database :'+config.db);
    }
});
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));

//Parse application json
app.use(bodyParser.json());

//Provide UI layer  
app.use(express.static(__dirname + '/client/dist/'));

//Routes
app.use('/authentication', authentication);

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () =>{
    console.log('Listening on 8080');
});