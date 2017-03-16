var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  console.log('主页get请求');
  res.send('hello world');
});

app.post('/', function(req, res){
  console.log('主页post请求');
  res.send('hello post')
});

app.get('/users',function(req, res){
  console.log('用户页面');
  res.send('users');
})


var server = app.listen(8081, function(){
  var host = server.address().address
  var port = server.address().port
  console.log('访问地址：http://%s%s',host,port)
})
