var fs=require('fs');
var files=fs.rename('./message.txt','./test/test.txt',function(err){
    if(err) console.log('移动文件操作失败。');
    else console.log('移动文件操作成功。');
});








