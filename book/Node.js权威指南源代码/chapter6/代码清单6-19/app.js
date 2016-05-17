var fs=require('fs');
fs.stat('./message.txt',function(err,stats){
    console.log(stats);
});





