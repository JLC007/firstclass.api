'use strict'
var express = require('express');
var index = require('./routes/index');
var fetch = require('./routes/fetch');

var app = express();

var main = function () {
  var http = require('http');
  var cors = require('cors');

  //require('./routes')(app);
  app.use(cors());
  var server = http.createServer(app);
  //app.set('socketio', io);

  app.use('/user', function (req, res, next) {
    res.status(200).send('Request Type:' + req.method)
  })

  app.use('/', index);

  app.use('/etl',fetch);

  app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!')
  })

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  server.listen(9150);
}

main();
module.exports = app;


