var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('listening', function () {
    server.setMulticastTTL(128); 
    server.addMembership('230.185.192.108');
});
setInterval(broadCast,1000);
function broadCast(){
    var buf=new Buffer((new Date()).toLocaleString());
    server.send(buf,0,buf.length, 8088, "230.185.192.108");
}


