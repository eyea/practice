var fs=require('fs');
var domain = require('domain');
var d = domain.create();
fs.readFile('./test.txt',d.bind(function(err, data) {
    if(err) throw err;
    else console.log(data);
}));
d.on('error', function(err) {
    console.log('读取文件时发生以下错误：');
    console.log(err);
});




    








