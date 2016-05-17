var fs=require('fs');
var buf=new Buffer('我喜爱编程');
fs.open('./message.txt','a',function(err,fd) {
    fs.write(fd,buf,3,9,0,function(err,written,buffer) {
        fs.write(fd,buf,12,3,null,function(err,written,buffer) {
            if(err) console.log("写文件操作失败。");
            else console.log("写文件操作成功。"); 
        }); 
    });
})






