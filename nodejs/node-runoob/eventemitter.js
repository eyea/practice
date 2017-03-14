var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.emit('error');
