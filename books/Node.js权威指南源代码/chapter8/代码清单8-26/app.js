var https = require('https');
var fs= require('fs');
var pk = fs.readFileSync('./privatekey.pem');
var pc = fs.readFileSync('./certificate.pem');
var opts ={
    key: pk, 
    cert: pc 
};
var server = https.createServer(opts, function(req, res) {
    console.log(req.url);
    if(req.url!=="/favicon.ico"){
        res.setHeader('Content-Type','text/html');
        res.write('<html><head><meta charset="utf-8"/></head>');
        res.write("你好");
        res.end();
    }
});
server.listen(443, 'localhost');
server.on('listening',function(){
    console.log('服务器端开始监听。');
    server.close();  
});
server.on('close',function(){
    console.log('服务器已被关闭。');  
});

