var fs=require('fs');
fs.exists('./message.txt',function(exists){
    if(exists)
        console.log('该文件存在。');
    else
        console.log('该文件不存在。');
})






