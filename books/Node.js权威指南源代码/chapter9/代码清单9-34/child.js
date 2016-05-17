var http = require('http');
http.createServer(function(req, res) {
    if(req.url!=="/favicon.ico"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<head><meta charset="utf-8"/></head>');
        res.end('你好\n');
        console.log("这段代码被运行在子进程中。");
    }
}).listen(1337);