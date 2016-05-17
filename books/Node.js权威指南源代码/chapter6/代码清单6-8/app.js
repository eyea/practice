var fs=require('fs');
fs.appendFile('./message.txt','这是追加的数据。','utf8',function(err){
    if(err) console.log('追加文件操作失败。');
    else console.log('追加文件操作成功。');
});



