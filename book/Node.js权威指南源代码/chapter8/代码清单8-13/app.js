var http = require('http');
var server=http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        if(res.headersSent) console.log('响应头已发送');
        else console.log('响应头未发送');
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(res.headersSent) console.log('响应头已发送');
        else console.log('响应头未发送'); 
        res.write('<html><head><meta charset="utf-8"/></head>');
        res.write("你好");      
    }
    res.end();
}).listen(1337, "localhost");


