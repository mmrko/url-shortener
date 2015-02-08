require('6to5/register')({
    only: /lib/
});

module.exports = require('./lib/main');
