var fs=require('fs');
var file = fs.createReadStream('./message.txt');
var out = fs.createWriteStream('./anotherMessage.txt');
file.on('data', function(data) {
    out.write(data);
});
out.on('open',function(fd){
    console.log('需要被写入的文件已被打开。');
});
file.on('end', function() {
    out.end('再见。',function() {
        console.log('文件全部写入完毕。');
        console.log('共写入%d字节数据',out.bytesWritten);
    });
});









