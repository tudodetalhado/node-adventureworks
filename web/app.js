var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// SET UP the config to the SQL SERVER
// Tidious only supports sql server authentication
var config = {
    userName: 'USERNAME',
    password: 'PASSWORD',
    server: 'SERVER',
    options:{
        database: 'AdventureWorks2008R2',
        instanceName:'SQL_SERVER_INSTANCE'

    }
};

var dbConfig = require('./dev.config.json') || config;

var SqlDb = require('../data/sql_db');
var sqlDb = new SqlDb(dbConfig);
var Repository = require('../data/repository');
var repository = new Repository(sqlDb);
var DataService = require('../data/data_service');
var dataService = new DataService(repository);


var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make dataService available for the controller!
app.use(function(req, res, next) {
   req.dataService = dataService;
   next();
   
});

app.use('/', routes);
app.use('/api', api);
app.use('/users', users);
app.use('/products',products);
app.use('/app',express.static(__dirname +'/spa'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
