var fs=require('fs');
fs.watch('./message.txt',function(event,filename) {
//fs.watch('./message.txt',{persistent:false},function(event,filename) {
    console.log(event);
    console.log(filename);
});








