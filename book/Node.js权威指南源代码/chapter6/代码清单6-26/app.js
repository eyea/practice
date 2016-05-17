var fs=require('fs');
fs.unlink('./message.txt',function(err){
    if(err) console.log('删除硬链接操作失败。');
    else console.log('删除硬链接操作成功。');
});





