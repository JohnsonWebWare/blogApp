global.appRoot   = __dirname;
global.lib    = global.appRoot + '/lib';
global.config = require('./config')[process.env.NODE_ENV || 'development'];
global.util   = require('util');

require(global.lib + '/init')
	.set('view engine', 'pug')
	.locals.pretty = !(process.env.NODE_ENV == 'production');