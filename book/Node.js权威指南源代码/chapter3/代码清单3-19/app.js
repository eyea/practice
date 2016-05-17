var http = require('http');//引用http模块
var server = http.createServer();//创建http服务器并将该服务器赋值给变量server
//为server服务器在接收到客户端请求时触发的request事件绑定事件处理函数
server.on('request', function(req,res) { 
    if(req.url!=="/favicon.ico"){
        console.log(req.url);
    }
    res.end();
});
server.on('customEvent',function(arg1,arg2,arg3){
    console.log('自定义事件被触发。');
    console.log(arg1);
　　console.log(arg2);
　　console.log(arg3);
});
server.emit('customEvent','自定义参数1','自定义参数2','自定义参数3');
server.listen(1337, "127.0.0.1");

