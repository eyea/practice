var fs=require('fs');
var path=require('path');
var myPath=path.resolve('a','b','c/message.txt');
console.log(myPath);
var file = fs.createReadStream(myPath);
file.on('data', function(data) {
    console.log(data.toString());
});










