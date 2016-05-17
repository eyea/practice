var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg,rinfo) {
    var buf=new Buffer("确认信息："+msg);
    server.setTTL(128);
    server.send(buf,0,buf.length,rinfo.port,rinfo.address);    
});
server.bind(41234,'192.168.1.100');  
