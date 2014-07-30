var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var twitter = require('twitter');
var twit = new twitter({
  consumer_key: 'bDKdPP5H6uIbh7ZseQ4nD15mG',
  consumer_secret: '5Y5M2UhvXBHjyNMi6lohgGHNQPbZ4HMIcZVY1uulvKNHvZKSor',
  access_token_key: '2379281144-Dt69yDkixhI3SO963jopNQIA6o4HhC080tDZHCt',
  access_token_secret: 'OEgCMl2GnABpIhNsxhbsSobGdHxGo8daGTCjmafX8UAY2'
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.get('/show-favorites', function(req, res) {
  twit.getFavorites(function(data){
    res.render('favorites', {favorites: data});
  });

});

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
