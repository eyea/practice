var http = require('http');
var server=http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        res.on('close',function(){console.log('连接被中断。');});
        setTimeout(function(){
            res.setHeader('Content-Type','text/html');
            res.write('<html><head><meta charset="utf-8"/></head>');
            res.write("你好");
            res.end();
        },5000);
    }    
}).listen(1337, "localhost");



