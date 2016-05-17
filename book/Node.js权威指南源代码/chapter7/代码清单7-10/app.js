var net = require('net');
var file = require('fs').createWriteStream('./message.txt');
var server = net.createServer();
server.on('connection', function(socket) {  
   socket.pause();
   setTimeout(function() {                     
        socket.resume();
        socket.pipe(file); 
   }, 30000);    
   socket.on('data',function(data){                     
        socket.pause();
        setTimeout(function() {          
            socket.resume();	    
        }, 30000);
    });
});
server.listen(8431,'localhost');


