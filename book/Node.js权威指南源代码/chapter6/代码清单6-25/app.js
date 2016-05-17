var fs=require('fs');
fs.link('./message.txt','./test/test.txt',function(err){
    if(err) console.log('创建硬链接操作失败。');
    else console.log('创建硬链接操作成功。');
});





