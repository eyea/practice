var net = require('net');
var http = require('http');
var child_process = require('child_process');
var fs = require('fs');
var child = child_process.fork('child.js');
var server = net.createServer();
server.listen(1337, '127.0.0.1', function () {
    child.send('server', server);
    console.log('父进程中的服务器已创建。');

    var httpServer = http.createServer();
    httpServer.on('request', function (req, res) {
        if(req.url!=="/favicon.ico"){
            var sum=0;
            for(var i=0;i<1000000;i++){
                sum+=i;
            }        
            res.write("客户端请求在父进程中被处理。");
            res.end("sum="+sum);
        }
    });
    httpServer.listen(server);
});
