var fs=require('fs');
fs.open('./message.txt','r',function(err,fd) {
    var buf=new Buffer(255);
    //一个汉字的utf编码为三个字节数据
    fs.read(fd,buf,0,9,3,function(err, bytesRead, buffer){
        console.log(buffer.slice(0,bytesRead).toString());
    });
})




