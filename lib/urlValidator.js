'use strict';

var url = require('url');
var blacklist = require('./config').domainBlackist;

var isValid = (urlStr) => {
    let hostname = url.parse(urlStr).hostname;
    return hostname && !blacklist.includes(hostname);
};

module.exports = {
    isValid
};
