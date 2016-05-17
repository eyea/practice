var fs=require('fs');
try{
    var data=fs.readFileSync('./test.txt','utf8');
    //在控制台中输出文件内容
    console.log(data);
}
catch(ex){
    console.log('读取文件时发生错误。');
}

