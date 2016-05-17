var PORT = 8088;
var HOST = '192.168.1.100';
var dgram = require('dgram');
var client = dgram.createSocket('udp4');
client.on('listening', function () {
    client.addMembership('230.185.192.108');
});
client.on('message', function (message, remote) {   
    console.log(message.toString());
});
client.bind(PORT, HOST);