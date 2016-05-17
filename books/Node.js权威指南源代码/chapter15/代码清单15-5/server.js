var http = require('http');
var sio = require('socket.io');
var fs=require('fs');
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync('./index.html'));
});
server.listen(1337);
var socket = sio.listen(server);
socket.on('connection', function(socket){
    socket.emit('setName','张三',function(data1,data2) {
        console.log(data1);
        console.log(data2);
    });
});
