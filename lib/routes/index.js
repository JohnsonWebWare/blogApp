const express = require('express');

module.exports = function (app) {
  app.use('/js',  express.static(global.appRoot + '/public/js'))
     .use('/css', express.static(global.appRoot + '/public/css'))
     .use('/img', express.static(global.appRoot + '/public/img'));

  app.get('/', function (req, res) {
    res.render('index', req.locals);
  });

  app.get('/login', function (req, res) {
    res.render('login', req.locals);
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
}