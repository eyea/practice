var fs=require('fs');
var data=new Buffer('我喜爱编程');
fs.writeFile('./message.txt',data,function(err){
    if(err) console.log('写文件操作失败。');
    else  console.log('写文件操作成功。');
});

