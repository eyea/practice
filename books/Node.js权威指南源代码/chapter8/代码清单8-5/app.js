var http = require('http');
var server=http.createServer(function (req, res) {
    res.end();
}).listen(1337, "127.0.0.1");
server.setTimeout(60*1000,function(socket){
    console.log('服务器超时。');
    console.log(socket);
});











