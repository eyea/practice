var fs=require('fs');
var file = fs.createReadStream('./message.txt');
var out = fs.createWriteStream('./anotherMessage.txt');
file.on('data', function(data) {
    out.write(data,function(){
        console.log(data.toString());
    });
});







