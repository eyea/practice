var net = require('net');
var server = net.createServer();
server.on('connection', function(socket) {
    address = socket.address();
    console.log('socket端口对象的地址信息为%j',address);
});
server.listen(8431,'localhost');



