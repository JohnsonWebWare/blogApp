const app        = require('express')();
const server     = require('http').Server(app);
const bodyParser = require('body-parser');
const session    = require('express-session');
const mongoose   = require('mongoose');

mongoose.connect(global.config.dbURL);

app.use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(session({
    secret: global.config.secret || 'BlogSecret',
    resave: false,
    saveUninitialized: false
  }));

require('./passport')(app);
require('./routes')(app);

server.listen(global.config.port || 8080, function () {
  console.info('Server listening on Port: ' + global.config.port);
});


module.exports = app;