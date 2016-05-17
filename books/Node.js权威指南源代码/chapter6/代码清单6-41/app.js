var fs=require('fs');
var out = fs.createWriteStream('./test1.txt');
for(var i=1;i<=10000;i++){
    var flag=out.write(i.toString());
    console.log(flag);
}
out.on('drain',function(){
    console.log('操作系统缓存区中的数据已全部输出。');
    var out = fs.createWriteStream('./test2.txt');
    for(var i=1;i<=10;i++){
        var flag=out.write(i.toString());
        console.log(flag);
    }
    out.on('drain',function(){
        console.log('操作系统缓存区中的数据已全部输出。');
    });
});






