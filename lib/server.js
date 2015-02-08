'use strict';

var http = require('http');
var path = require('path');
var chalk = require('chalk');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var logger = require('./logger');
var routes = require('./routes');

var serve = serveStatic(path.join(__dirname, '..', 'public'));
var server = http.createServer();

function logError(err) {
    logger(err.stack || err.toString());
}

server.on('request', (req, res) => {

    var done = finalhandler(req, res, { onerror: logError });

    if (req.url === '/') {
        serve(req, res, done);
    }
    else if (req.url === '/favicon.ico') {
        serve(req, res, done);
    }
     else if (req.method === 'POST' && req.url === '/shorten') {
        routes.shorten(req, res, done);
    }
    else if (req.method === 'GET' && req.url.split('/').length === 2) {
        routes.urlGet(req, res, done);
    } else {
        serve(req, res, done);
    }

});

server.on('listening', () => {
    let address = server.address();
    logger('Server running at %s', chalk.cyan(`${address.address}:${address.port}`));
});

module.exports = server;
