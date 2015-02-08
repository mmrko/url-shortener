module.exports = {
    hostname: 'localhost',
    serverPort: 9000,
    domainName: process.env.NODE_ENV === 'production' ?  'short.tld' : 'localhost',
    domainBlackist : [
        'some-blacklisted-domain-name.com'
    ]
};
