var http = require('http');

//用于请求的选项
var options = {
  host: 'localhost',
  port: '8081',
  path: '/server_index.html'
};
//process.on('uncaughtException', function (err) {
  //  console.log(err);
//});
//处理响应的回调函数
var callback = function(res){
  // 不断更新数据
  var body = '';
  res.on('data', function(data){
    body += data;
  });

  res.on('end', function(){
    console.log(body)
  })  

}

//向服务器发送请求
var req = http.request(options, callback);
req.end();
