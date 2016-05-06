var http = require('http');							//require引用内置模块http
var url = require('url');							//require引用内置模块url
var webPath = {//许可的路径
	"/":"Hello World\n",
	"/about":"ID:z3f\nQQ:10590916"
}
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});		//设置文件头信息
	  var pathname = url.parse(req.url).pathname;		//把请求网址交给url对象处理
	  //如果访问路径没有被webPath指定就是Not found
	  var bodyStr = webPath[pathname] || "Not found! \n"+req.url+" was not found on this server.";
	  res.end(bodyStr);							//输出内容
	}).listen(9527, '127.0.0.1');							//绑定IP和端口
console.log('Server running at http://127.0.0.1:9527/');		//控制台输出提示