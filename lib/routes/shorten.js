'use strict';

var querystring = require('querystring');
var shortener = require('../shortener');

module.exports = (req, res, done) => {

    var shortUrlId;

    req.on('data', function (data) {

        let queryStr = data.toString();
        let url = querystring.parse(queryStr).link;

        shortUrlId = shortener.shorten(url);

    });

    req.on('end', function () {

        if (!shortUrlId) return done();

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Length': shortUrlId.length
        });

        res.end(shortUrlId);

    });

};
