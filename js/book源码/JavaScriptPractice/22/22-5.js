var http = require('http');							//require引用内置模块http
var url = require('url');							//require引用内置模块url
var fs = require('fs');							//require引用内置模块fs
var msgOf404 = require('./22-5.json');			//require引用自定义模块
var webPath = {//许可的路径
	"/":"Hello World\n",
	"/about":"ID:z3f\nQQ:10590916"
}
var on200 = function(req,res,bodyStr){
	res.writeHead(200, {'Content-Type': 'text/plain'});		//设置文件头信息
	res.end(bodyStr);//对客户端输出内容后结束
}
var on404 = function(req,res){
	fs.readFile("server/404.html", "utf-8", function (err, file) {//用内置fs对象读取文件
		res.writeHead(404, {'Content-Type': 'text/html'});		//设置文件头信息
		res.write(file
					.replace(/<!--{url}-->/g,req.url)//通过替换的方式把请求网址显示出来
					.replace(/<!--{msg}-->/g,msgOf404[1+parseInt(Math.random()*3)])//通过替换方式随机显示1条名言
				, "utf-8");//用utf-8编码输出，这是为了和前面readFile时的编码一致
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