var http = require('http');//引用http模块
var server = http.createServer();//创建http服务器并将该服务器赋值给变量server
server.on('removeListener',function(e,f){
    console.log("对"+e+"事件取消事件处理函数");
    console.log(f);
});
server.on('newListener',function(e,f){
    console.log("对"+e+"事件添加事件处理函数");
    console.log(f);
});
var testFunction=function(req,res) {
    if(req.url!=="/favicon.ico")
        console.log('发送响应完毕。');
};
//为server服务器在接收到客户端请求时触发的request事件绑定多个事件处理函数
server.on('request', function(req,res) {
    if(req.url!=="/favicon.ico")
        console.log('接收到客户端请求。');
});

server.on('request', function(req,res) { 
    if(req.url!=="/favicon.ico"){
        console.log(req.url);
    }
    res.end();
});

server.on('request',testFunction);
server.removeListener('request',testFunction);
server.listen(1337, "127.0.0.1");



