var net = require('net');
var server = net.createServer(function(socket) {
    console.log('客户端与服务器端连接已建立。');
});
server.listen(8431,'localhost',function() { 
    console.log('服务器端开始监听。');
});