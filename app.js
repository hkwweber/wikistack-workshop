'use strict'
var express = require('express');
var app = express();
var morgan = require('morgan');
var router = require('./routes/index.js');
var fs = require('fs');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require("./models/index.js");

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use(express.static('./public'));

app.use('/', router);

models.db.sync({})
.then(function () {
    app.listen(3000, function (){
        (console.log("listening on port 3000"))
    });
})
.catch(console.error);

