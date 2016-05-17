var fs=require('fs');
fs.symlink('./a','./b','dir',function(err){
    if(err) console.log('为目录创建符号链接操作失败。');
    else{
        fs.symlink(__dirname+'/a/message.txt',__dirname+'/b/anotherMessage.txt','file',function(err){
            if(err) console.log('为文件创建符号链接操作失败。');
            else console.log('为文件创建符号链接操作成功。');
        });
    }
});





