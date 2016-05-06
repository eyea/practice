var http = require('http');							//require引用内置模块http
var url = require('url');							//require引用内置模块url
var fs = require('fs');							//require引用内置模块fs
var path = require('path');						//require引用内置模块path
var msgOf404 = require('./22-5.json');			//require引用自定义模块
var MIME = require('./22-8.MIME.json');			//require引用自定义模块
var cfg = require('./22-11.config.js');			//require引用自定义模块
var formidable = require('formidable');			//require引用第三方模块

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
var upload = function(req,res){
	var form = new formidable.IncomingForm()
	var fields=[],files=[],fieldsDATA={},filesDATA={}
		form.uploadDir = cfg.root;//指定目录
		form.keepExtensions=true;//保持上传文件的后缀
		form.maxFieldsSize = 2 * 1024 * 1024;//最大限制2M
		form.on('field', function(field, value) {//监听有内容时
                fields.push([field, value]);//获取表单字段信息
			})
			.on('file', function(field, file) {//监听有上传文件时
				files.push([field, file]);//获取表单上传文件信息
			})
			.on('end', function() {//监听完成时
				console.log('-> upload done');//控制台输出提示，可去掉
				for (var i=0; i<fields.length;i++){
					fieldsDATA[fields[i][0]] = fields[i][1];//数组转对象
				}
				for (var i=0; i<files.length;i++){
					filesDATA[files[i][0]] = files[i][1];//数组转对象
				}
				var oldf = filesDATA.upfile.path;
				var newf = oldf.replace(/(\w+)\./,"z3f.").replace(/\\/g,"/");
				fs.renameSync(oldf,newf);//异步修改文件名
				res.writeHead(200, {'content-type': 'text/html'});
				res.write('TEMP Name:'+oldf+'<br />');
				res.write('NEW Name:'+newf+'<br />');
				res.write('<br /><img src="'+newf.substr(newf.lastIndexOf("/"))+'"/>');
				res.end('ok');
			});
		form.parse(req);//主要方法
};
var onFiles = function(req,res){
	var pathname = url.parse(req.url).pathname;		//把请求网址交给url对象处理
		pathname = path.normalize(pathname.replace(/\.\./g, ""));//处理父路径
		if(pathname==="\\"){		//如果是根目录就用设置的默认首页
			pathname = cfg.index;
		}
		if(pathname==="\\upload" && req.method.toLowerCase() == 'post'){
			upload(req,res);
			return;
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