var http = require('http');
var server=http.createServer(function (req, res) {
    //暂不指定接收到客户端请求时的处理
}).listen(1337, "127.0.0.1");
server.on('listening',function(){
    console.log('服务器端开始监听。');  
    server.close();
});
server.on('close',function(){
    console.log('服务器已被关闭。');  
});










