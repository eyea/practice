var http = require('http');
var express= require('express');
var sio=require('socket.io');

var app = express();
var server = http.createServer(app);
app.get('/', function(req,res) {
    res.sendfile(__dirname + '/index.html');
});
server.listen(1337);
var socket =sio.listen(server);
socket.on('connection', function(socket){
    socket.on('set nickname', function (name) {
        socket.set('nickname', name,function(){
            socket.emit('send nickname',name);
        });
    });
    socket.on('get nickname', function () {
        socket.get('nickname', function (err,name) {
            if(err) socket.emit('err',err.message);
            else socket.emit('send nickname',name);
        });
    });
});
