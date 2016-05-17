var fs=require('fs');
var path=require('path');
var myPath=path.normalize('.//a//b//d//..//c/e//..//');
console.log(myPath);
var file = fs.createReadStream(myPath+'message.txt');
file.on('data', function(data) {
    console.log(data.toString());
});









