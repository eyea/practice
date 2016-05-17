var http = require('http');
var fs = require('fs');
var server=http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        var out=fs.createWriteStream('./request.log');
        out.write('客户端请求所用方法为：'+req.method+'\r\n');
        out.write('客户端请求所用url字符串为:'+req.url+'\r\n');
        out.write('客户端请求头对象为：'+JSON.stringify(req.headers)+'\r\n');
        out.end('客户端请求所用HTTP版本为：'+req.httpVersion);
    }
    res.end();
}).listen(1337, "127.0.0.1");









