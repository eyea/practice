var fs=require('fs');
var path=require('path');
var myPath=path.resolve('a','b','c');
console.log(myPath);
var file = fs.createReadStream(myPath+'/message.txt');
file.on('data', function(data) {
    console.log(data.toString());
});










