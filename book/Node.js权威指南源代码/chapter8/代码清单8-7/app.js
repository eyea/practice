var http = require('http');
var fs = require('fs');
var server=http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        req.on('data',function(data){
            console.log('服务器端接收到数据：'+decodeURIComponent(data));
        });
        req.on('end',function(){
            console.log('客户端请求数据已全部接收完毕。');
        });
    }
    res.end();
}).listen(1337, "127.0.0.1");


