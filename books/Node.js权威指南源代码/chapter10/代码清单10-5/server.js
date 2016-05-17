var http = require('http');
var domain = require('domain');
http.createServer(function(req, res) {
    var reqd = domain.create();
    reqd.add(req);
    reqd.add(res);
    reqd.on('error', function(err) {
        res.writeHead(200);
        res.write('服务器端接收客户端请求时发生以下错误：');
        res.end(err.message);
    });
    res.writeHead(200);
    //reqd.remove(req);
    req.on('data',function(){
        noneexists();
        res.write('你好。');
        res.end(); 
    });
}).listen(1337);




    








