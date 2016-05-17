var fs=require('fs');
fs.readFile('./a.gif','base64',function(err,data){
    fs.writeFile('./b.gif',data.toString(),'base64',function(err){
        if(err) console.log('写文件操作失败。');
        else  console.log('写文件操作成功。');
    });
});


