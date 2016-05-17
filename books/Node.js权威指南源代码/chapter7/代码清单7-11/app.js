var net = require('net');
var file = require('fs').createWriteStream('./message.txt');
var server = net.createServer();
server.on('connection', function(socket) { 
    socket.setTimeout(10*1000);  
    socket.pause();    
    socket.on('timeout',function(){   
        socket.resume(); 
        socket.pipe(file);         
    });  
    socket.on('data',function(data){                     
       socket.pause();
    });
});
server.listen(8431,'localhost');
