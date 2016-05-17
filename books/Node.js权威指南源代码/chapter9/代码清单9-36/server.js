var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
} 
else {
    http.createServer(function(req, res) {
        if(req.url!=="/favicon.ico"){
            var sum=0;
            for(var i=0;i<5000000;i++){
                sum+=i;
            }      
            res.writeHead(200);
            res.write("客户端请求在子进程"+cluster.worker.id+"中被处理。");
            res.end("sum="+sum);
        }
    }).listen(1337);
}