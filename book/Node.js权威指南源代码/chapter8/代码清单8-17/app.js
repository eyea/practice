var http = require('http');
var server=http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        res.setTimeout(1000);
        res.on('timeout',function(){console.log('响应超时。');});
        setTimeout(function(){
            res.setHeader('Content-Type','text/html');
            res.write('<html><head><meta charset="utf-8"/></head>');
            res.write("你好");
            res.end();
        },2000);
    }
    
}).listen(1337, "localhost");

