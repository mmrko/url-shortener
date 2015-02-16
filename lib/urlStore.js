'use strict';

module.exports = new Map();

// Since babel.js does not support extending built-ins
// we have to resort to this rather ugly work-around
module.exports.put = function (url, id) {
    Map.prototype.set.apply(this, [ url, id ]);
    Map.prototype.set.apply(this, [ id, url ]);
    return this;
};
