'use strict';

var path = require('path');
var chalk = require('chalk');
var shortId = require('shortid');
var logger = require('./logger');
var config = require('./config');
var urlStore = require('./urlStore');
var urlValidator = require('./urlValidator');

const SHORT_URL_ID_LENGTH = 6;
const urlColor = chalk.cyan;
const shortUrlColor = chalk.green;

var shorten = (url) => {

    if (!url || !urlValidator.isValid(url)) {
        logger('Invalid URL: %s', urlColor(url));
        return '';
    }

    let existingShortUrlId = urlStore.get(url);
    let shortUrlId;
    let shortUrl;

    if (existingShortUrlId) {
        let existingShortUrl = path.join(config.domainName, existingShortUrlId);
        logger('Found an existing URL redirect: %s -> %s', shortUrlColor(existingShortUrl), urlColor(url));
        return existingShortUrlId;
    }

    shortUrlId = shortId.generate().slice(0, SHORT_URL_ID_LENGTH);
    shortUrl = path.join(config.domainName, shortUrlId);

    urlStore.put(url, shortUrlId);
    logger('Shortened %s to %s', urlColor(url), shortUrlColor(shortUrl));

    return shortUrlId;

};

module.exports = {
    shorten,
    getOriginalUrl: (shortUrlId) => {
        return urlStore.get(shortUrlId) || logger('No matching URL stored for the given ID: %s', shortUrlColor(shortUrlId));
    }
};
