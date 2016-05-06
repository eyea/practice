var http = require('http');							//require引用内置模块http
var url = require('url');							//require引用内置模块url
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});		//设置文件头信息
	  var pathname = url.parse(req.url).pathname;		//把请求网址交给url对象处理
	  var bodyStr ="";									//定义一个变量用来存储要输出的内容
	  if(pathname==="/"){								//如果是首页
	  	bodyStr = 'Hello World\n';
	  }else{
	  	bodyStr = req.url								//如果是其他路径
	  }
	  res.end(bodyStr);							//输出内容
	}).listen(9527, '127.0.0.1');							//绑定IP和端口
console.log('Server running at http://127.0.0.1:9527/');		//控制台输出提示