var http = require('http');								//require引用内置模块http
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});		//设置文件头信息
	  res.end('Hello World\n');							//输出文件内容
	}).listen(9527, '127.0.0.1');							//绑定IP和端口
console.log('Server running at http://127.0.0.1:9527/');		//控制台输出提示