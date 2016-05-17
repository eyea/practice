var http = require('http');
process.on('message', function (msg,server) {
    if (msg === 'server') {
        console.log('子进程中的服务器已创建。');
        var httpServer = http.createServer();
        httpServer.on('request', function (req, res) {
            if(req.url!=="/favicon.ico"){
                sum=0;
                for(var i=0;i<1000000;i++){
                    sum+=i;
                }        
                res.write("客户端请求在子进程中被处理。");
                res.end("sum="+sum);
            }
        });
        httpServer.listen(server);
    }
});