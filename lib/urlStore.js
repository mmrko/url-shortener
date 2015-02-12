'use strict';

var inherits = require('util').inherits;

class UrlStore {

    constructor () {
        Map.call(this);
    }

}

inherits(UrlStore, Map);

UrlStore.prototype.put = function (url, id) {
    Map.prototype.set.apply(this, [ url, id ]);
    Map.prototype.set.apply(this, [ id, url ]);
    return this;
};

module.exports = new UrlStore();
