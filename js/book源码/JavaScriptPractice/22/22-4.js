var http = require('http');							//require引用内置模块http
var url = require('url');							//require引用内置模块url
var fs = require('fs');							//require引用内置模块fs
var webPath = {//许可的路径
	"/":"Hello World\n",
	"/about":"ID:z3f\nQQ:10590916"
}
var on200 = function(req,res,bodyStr){
	res.writeHead(200, {'Content-Type': 'text/plain'});		//设置文件头信息
	res.end(bodyStr);//对客户端输出内容后结束
}
var on404 = function(req,res){
	fs.readFile("server/404.html", "binary", function (err, file) {//用内置fs对象读取文件
		res.writeHead(404, {'Content-Type': 'text/html'});		//设置文件头信息
		res.write(file, "binary");//将读取的内容输出给客户端
		res.end();//结束输出
	});
};
	http.createServer(function (req, res) {
	  var pathname = url.parse(req.url).pathname;		//把请求网址交给url对象处理
	  var bodyStr = webPath[pathname];		//如果访问路径没有被webPath指定会返回undefined
	  if(bodyStr){
	  	on200(req, res,bodyStr);//找到许可路径就让on200函数处理
	  }else{
	  	on404(req, res);//没找到就让on404函数处理
	  }
	}).listen(9527, '127.0.0.1');							//绑定IP和端口
console.log('Server running at http://127.0.0.1:9527/');		//控制台输出提示