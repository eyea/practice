var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.use(express.directory(__dirname));
//app.use(express.directory(__dirname,{icons:true}));
//app.use(express.directory(__dirname,{filter:function(file,pos,list){return (file.indexOf('.') === -1 || file.indexOf('.js') >= 1);}}));
app.listen(1337, "127.0.0.1");
