var http = require('http');
http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        noneexist();
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<head><meta charset="utf-8"/></head>');
        res.end('你好\n');
    }
}).listen(1337, "127.0.0.1");
process.on('uncaughtException', function(err) {
    console.log('接收客户端请求时发生以下错误：');
    console.log(err);
});
    








