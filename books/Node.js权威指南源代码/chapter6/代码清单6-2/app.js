var fs=require('fs');
fs.readFile('./test.txt','utf8',function(err, data) {
    if(err) console.log('读取文件时发生错误。');
    //在控制台中输出文件内容
    else console.log(data);
});

