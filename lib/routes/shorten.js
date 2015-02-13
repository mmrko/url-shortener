'use strict';

var querystring = require('querystring');
var shortener = require('../shortener');
var urlValidator = require('../urlValidator');

module.exports = (req, res, done) => {

    var shortUrlId, url;

    req.on('data', function (data) {

        let queryStr = data.toString();

        url = querystring.parse(queryStr).link;
        shortUrlId = shortener.shorten(url);

    });

    req.on('end', function () {

        if (!shortUrlId) {
            return done({
                status: urlValidator.isBlackListed(url) ? 403 : 404
            });
        }

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Length': shortUrlId.length
        });

        res.end(shortUrlId);

    });

};
