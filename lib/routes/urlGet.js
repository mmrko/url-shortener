'use strict';

var url = require('url');
var logger = require('../logger');
var shortener = require('../shortener');

module.exports = (req, res, done) => {

    var shortUrlId = req.url.slice(1);
    var url = shortener.getOriginalUrl(shortUrlId);

    if (!url) return done();

    logger('Redirecting to', url);

    res.writeHead(301, {
        'Content-Type': 'text/plain',
        'Location': url
    });

    res.end(url);

};
