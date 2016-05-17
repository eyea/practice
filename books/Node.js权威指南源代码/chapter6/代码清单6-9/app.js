var fs=require('fs');
fs.open('./message.txt','r',function(err,fd) {
    console.log(fd);
})



