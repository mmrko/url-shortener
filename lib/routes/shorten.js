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
            let blacklisted = urlValidator.isBlackListed(url);
            return done({
                status: blacklisted ? 403 : 404,
                toString: function () { return blacklisted ? 'BLACKLISTED' : ''; }
            });
        }

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Length': shortUrlId.length
        });

        res.end(shortUrlId);

    });

};
