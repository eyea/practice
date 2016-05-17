var fs=require('fs');
var watcher=fs.watch('./message.txt');
watcher.on('change',function(event,filename) {
    console.log(event);
    console.log(filename);
});








