var fs=require('fs');
var file = fs.createReadStream('./message.txt');
var out = fs.createWriteStream('./anotherMessage.txt');
file.pipe(out,{end:false});
file.on('end', function() {
    out.end('再见。');
});






