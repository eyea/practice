var express = require('express');
var fs=require('fs');
var app = express();
app.use(express.limit(1024*1024));
app.use(express.bodyParser());
app.use(app.router);
app.use(function(err,req,res,next) {
    console.error(err.stack);
    res.send(200,"服务器端触发一个错误，错误消息为："+err.message);
});
app.get('/index.html',function (req,res) {
    res.sendfile(__dirname+'/index.html');
});
app.post('/index.html',function (req,res) {
    var file=req.files.myfile;    
    fs.readFile(file.path,function(err,data){
        if(err) res.send('读文件操作失败。');
        else{
            fs.writeFile(file.name,data,function(err){
                if(err) res.send('写文件操作失败。');
                else res.send('文件上传成功。');
            });
        }
    });
});
app.listen(1337, "127.0.0.1");
