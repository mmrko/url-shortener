'use strict';

var url = require('url');
var blacklist = require('./config').domainBlackist;

var isBlackListed = (urlStr) => {
    let urlInfo = url.parse(urlStr);
    let hostname = urlInfo.hostname || urlInfo.pathname;
    return hostname && blacklist.includes(hostname);
};

var isValid = (urlStr) => {
    let hostname = url.parse(urlStr).hostname;
    return hostname && !blacklist.includes(hostname);
};

module.exports = {
    isValid,
    isBlackListed
};
