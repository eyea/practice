// 引入http模块
var http = require('http');

// 创建服务器
http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello world');
}).listen(8888);

// 终端打印信息
console.log('Server running at http://127.0.0.1:8888/');
