var fs=require('fs');
fs.utimes('./message.txt',new Date(),new Date(),function(err){
    if(err) console.log("修改文件时间操作失败。");
    else console.log("修改文件时间操作成功。");
});







