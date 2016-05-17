var fs=require('fs');
var out = fs.createWriteStream('./message.txt');
process.on('message',function(data){
    out.write(data);
});
