var http = require('http');						//需要引用Node内置的对象
	http.createServer(function (req, res) {		//创建一个HTTP服务
		res.writeHead(200, {'Content-Type': 'text/plain'});		//设置响应头的文件格式
		res.end('Hello World!');								//输出字符串Hello World!
	}).listen(9527, "127.0.0.1");				//创建的HTTP服务绑定指定IP和端口
console.log('Server running at http://127.0.0.1:9527/');		//非阻塞地在服务端控制台输出提示信息