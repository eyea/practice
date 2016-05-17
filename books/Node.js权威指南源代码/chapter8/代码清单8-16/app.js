var http = require('http');
var fs = require('fs');
var server=http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        fs.readFile('app.js',function(err, data) {
        //fs.readFile('test.txt',function(err, data) {
            if(err) console.log('读取文件时发生错误。');
            //在控制台中输出文件内容
            else{
                var flag=res.write(data);
                console.log(flag);
                res.end();
            }
        });
    }    
}).listen(1337, "localhost");



