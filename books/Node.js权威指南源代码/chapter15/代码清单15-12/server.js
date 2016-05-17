var http = require('http');
var express= require('express');
var sio=require('socket.io');
var app = express();
var server = http.createServer(app);
app.get('/', function(req,res) {
    res.sendfile(__dirname + '/index.html');
});
server.listen(80);
var io =sio.listen(server);
var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        socket.send('欢迎访问chat空间!');
        socket.on('message',function(msg){
            console.log('chat命名空间接收到消息:',msg);
        });
    });
var news = io
    .of('/news')
    .on('connection', function (socket) {
        socket.emit('send message','欢迎访问news空间!');
        socket.on('send message',function(data){
            console.log('news命名空间接收到send message事件，数据为:',data);
        });
    });
