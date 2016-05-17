var fs=require('fs');
var out = fs.createWriteStream('./message.txt');
out.on('error',function(err){
    console.log('写文件操作发生错误。');
});
out.write('一些测试数据。');
out.end();
out.write('一些新数据。');




