var fs=require('fs');
var watcher=fs.watch('./message.txt',function(event,filename) {
    console.log(event);
    console.log(filename);
    watcher.close();
});








