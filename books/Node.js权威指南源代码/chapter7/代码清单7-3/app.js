var net = require('net');
var server = net.createServer(function(socket) {
    console.log('客户端与服务器端连接已建立。');
});
server.listen(8431,'localhost',function() { 
    address = server.address();
    console.log('被监听的地址信息为%j',address);
});