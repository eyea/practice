var http = require('http');							//require引用内置模块http
var url = require('url');							//require引用内置模块url
var fs = require('fs');							//require引用内置模块fs
var path = require('path');						//require引用内置模块path
var msgOf404 = require('./22-5.json');			//require引用自定义模块
var MIME = require('./22-8.MIME.json');			//require引用自定义模块
var cfg = require('./22-10.config.js');			//require引用自定义模块

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
var onFiles = function(req,res){
	var pathname = url.parse(req.url).pathname;		//把请求网址交给url对象处理
		pathname = path.normalize(pathname.replace(/\.\./g, ""));//处理父路径
		if(pathname==="\\"){		//如果是根目录就用设置的默认首页
			pathname = cfg.index;
		}
	var filepath = cfg.root+pathname;			//找到真实地址
	path.exists(filepath,function(exists){//检查是否存在该文件
		if(!exists){
			on404(req,res);//如果不存在就提示404
		}else{
			fs.readFile(filepath,"binary",function(err,file){//读取文件
				if(err){//如果读取过程失败则返回500服务端程序错误
					res.writeHead(500,{"Content-Type":"text/plain"});
					res.end(err);
					return;
				}
				var ext = path.extname(filepath);//获取文件后缀
					ext = ext ? ext.slice(1) : 'unknown';//去点，对于没有后缀的当做未知文件
				var contentType = MIME[ext]||"application/octet-stream";//对没定义当做2进制处理
				res.writeHead(200,{"Content-Type":contentType});
				res.write(file,"binary");
				res.end();
			});
		}
	});
};
	http.createServer(function (req, res) {
		res.setHeader("Server","z3f nodejs web server/0.1");
	  	onFiles(req,res);
	}).listen(9527, '127.0.0.1');							//绑定IP和端口
console.log('Server running at http://127.0.0.1:9527/');		//控制台输出提示