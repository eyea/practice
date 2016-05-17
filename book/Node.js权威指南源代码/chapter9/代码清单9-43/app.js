var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster) {
    cluster.setupMaster({
        silent:true
    });
    var worker=cluster.fork();    
    worker.process.stdout.on('data',function (data) {
       console.log('接收到来自客户端请求，目标地址为: '+data); 
       worker.disconnect(); 
       timeout = setTimeout(function() {
           worker.send('disconnect');
       }, 2000); 
    });
    worker.on('disconnect', function() {
        console.log('子进程%d断开连接。',worker.id);  
    });
    cluster.on('exit',function(worker,code,signal) {
        if (worker.suicide === true) {
            console.log('子进程%d正常退出。',worker.id);       
        }
        else{
            console.log('子进程%d异常退出，退出代码为%d，',worker.id,code);
        }
        if(signal)
            console.log('退出信号为%s',signal);    
    });
} 
else {
    var server=http.createServer(function(req, res) {
        if(req.url!=="/favicon.ico"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<head><meta charset="utf-8"/></head>');
            res.end('你好\n');
            process.stdout.write(req.url);
        }
    });
    server.listen(1337);
    process.on('message', function(msg) {
        if (msg === 'disconnect') {
            server.close();
        }  
    });
}