require('6to5/register')({
    only: /lib/
});

var http = require('http');
var querystring = require('querystring');
var sinon = require('sinon');
var assert = require('chai').assert;
var shortId = require('shortid');
var urlStore = require('../lib/urlStore');
var server = require('../lib/server');
var config = require('../lib/config');

describe('server', function () {

    var queryParams, queryParamsStr, shortenOpts;

    before (function () {
        server.listen(config.serverPort, config.hostname);
    });

    after(function () {
        server.close();
    });

    beforeEach(function () {

        queryParams = {
            link: 'http://foo.bar/baz'
        };

        queryParamsStr = querystring.stringify(queryParams);

        shortenOpts = {
            hostname: config.hostname,
            port: config.serverPort,
            path: '/shorten',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        urlStore.clear();
        sinon.spy(shortId, 'generate');
    });

    afterEach(function () {
        shortId.generate.restore();
    })

    it ('should return a 6-character long short URL id in plain/text format', function (done) {

        var shortUrlId = '';

        var req = http.request(shortenOpts, function (res) {

            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], 'text/plain');

            res.on('data', function (chunk) {
                shortUrlId += chunk;
            });

            res.on('end', function () {
                assert.equal(shortUrlId.length, 6, 'short URL id length');
                assert.isString(shortUrlId, 'short URL id');
                done();
            });

        });

        req.write(queryParamsStr);
        req.end();

    });

    it ('should return an existing short URL id', function (done) {

        var shortUrlId = 'foobar';
        urlStore.put(queryParams.link, shortUrlId);

        var req = http.request(shortenOpts, function (res) {

            var existingShortUrlId = '';

            res.on('data', function (chunk) {
                existingShortUrlId += chunk
            });

            res.on('end', function () {
                assert.notOk(shortId.generate.called, 'no calls to shortid.generate()');
                assert.equal(existingShortUrlId, shortUrlId, 'identical short URL ids');
                done();
            });

        });

        req.write(queryParamsStr);
        req.end();

    });

    it ('should resolve original URL from a short URL id with a redirect', function (done) {

        var shortUrlId = 'barbaz';
        var url = 'http://foo.bar/baz';
        urlStore.put(url, shortUrlId);

        http.get([ 'http://', config.hostname, ':', config.serverPort, '/', shortUrlId ].join(''), function (res) {

            var id = '';

            assert.equal(res.statusCode, 301);
            assert.equal(res.headers['content-type'], 'text/plain');

            res.on('data', function (chunk) {
                id += chunk;
            });

            res.on('end', function () {
                assert.equal(id, url);
                done();
            })

        });

    });

    it ('should return 404 if a given short URL id has no matching URL', function (done) {

        http.get([ 'http://', config.hostname, ':', config.serverPort, '/foobar' ].join(''), function (res) {
            assert.equal(res.statusCode, 404);
            done();
        });

    });

    it ('should return 403 on a blacklisted URL', function (done) {

        var blacklistedDomain = config.domainBlackist[0];

        var req = http.request(shortenOpts, function (res) {

            assert.equal(res.statusCode, 403);
            done();

        });

        assert.isString(blacklistedDomain);

        req.write(querystring.stringify({ link: blacklistedDomain }));
        req.end();

    });

});
