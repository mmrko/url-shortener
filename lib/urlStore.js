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

// TODO: Remove this override once the following fix is merged upstream:
// https://github.com/6to5/6to5/issues/713
UrlStore.prototype.clear = function () {
    this.forEach((val, key) => {
        this.delete(key);
    });
};

module.exports = new UrlStore();
