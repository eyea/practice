var fs=require('fs');
fs.watchFile('./message.txt',function(curr, prev) {
//fs.watchFile('./message.txt',{persistent:false,interval:60*60*1000},function(curr, prev) {
    if(Date.parse(prev.ctime)==0)
        console.log('message.txt文件被创建。');
    else if(Date.parse(curr.ctime)==0)
        console.log('message.txt文件被删除。');
    else if(Date.parse(prev.mtime)!=Date.parse(curr.mtime))
        console.log('message.txt文件内容被修改。');

});








