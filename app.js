var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
require('dotenv').load();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var api = require('./routes/api');

var app = express();

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY_1, process.env.KEY_2]
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use(function(req, res, next) {
 if (req.url.charAt[0] != '#') {
   req.url = '/#' + req.url;
   res.redirect(req.url);
 } else {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
}
});

//I dont think this is what I want for this app...needs more research
//try to grab all routes and send them to here
// app.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// error handlers

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
