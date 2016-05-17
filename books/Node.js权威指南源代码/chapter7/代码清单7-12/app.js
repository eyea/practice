var net = require('net');
var server = net.createServer();
server.on('connection', function(socket) { 
    socket.setTimeout(10*1000);    
    socket.on('timeout',function(){   
        console.log('客户端连接已超时。'); 
        socket.setTimeout(0);       
    });  
});
server.listen(8431,'localhost');
