var server = require('./server');
var config = require('./config');

server.listen(config.serverPort, config.hostname);
