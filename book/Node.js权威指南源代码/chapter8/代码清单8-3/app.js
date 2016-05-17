var http = require('http');
var server=http.createServer(function (req, res) {
    //暂不指定接收到客户端请求时的处理
}).listen(1337, "127.0.0.1");
server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        console.log('服务器地址及端口已被占用。');
    }
});








