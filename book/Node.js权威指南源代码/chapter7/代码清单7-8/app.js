var net = require('net');
var server = net.createServer();
server.on('connection', function(socket) {
    socket.setEncoding('utf8');
    socket.on('data',function(data){
        console.log(data);
        console.log('已接收到%d字节数据。',socket.bytesRead);
    });
    socket.on('end',function(){
        console.log('客户端连接被关闭。');
    });
});
server.listen(8431,'localhost');


