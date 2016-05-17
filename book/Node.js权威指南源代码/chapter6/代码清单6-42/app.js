var fs=require('fs');
var readStream = fs.createReadStream('./天地.mp3');
var out = fs.createWriteStream('./天地2.mp3');
readStream.on('data', function(data) {
    var flag=out.write(data);
    console.log(flag);
})
out.on('drain',function(){
    console.log('操作系统缓存区中的数据已全部输出。');
});






