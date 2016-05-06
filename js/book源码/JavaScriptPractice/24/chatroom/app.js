var http = require("http")
	,socket = require("socket.io")
	,fs = require("fs");
var app,io;
	app = http.createServer(function(req, res) {
		//读取本程序运行位置的client.html文件
		fs.readFile(__dirname+"/client.html",function(err, data){
			res.writeHead(200);//设置200HTTP状态
			res.end(data);
		});
	});
	//Http服务器绑定的端口
	app.listen(86);
	io = socket.listen(app);
	//设置socket.io日志级别
	io.set("log level", 1); 
	//监听链接事件
	io.sockets.on("connection",function(socket){
		//响应客户端msg事件
		socket.on("msg",function(data){
			console.log("Get a msg from client ...");
			//控制台输出接受到的数据，实际项目可无
			console.log(data);
			//把收到的信息广播出去
			socket.broadcast.emit("chat message",data);
		});
	});