var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html/:id?/:name?',function (req, res) {
    var str="";
    if(req.params.id)
        str+="ID参数值:"+req.params.id;
    if(str!="")
            str+="<br/>";
    if(req.params.name)
        str+="name参数值:"+req.params.name;
    res.send(str);
});
app.listen(1337, "127.0.0.1");
