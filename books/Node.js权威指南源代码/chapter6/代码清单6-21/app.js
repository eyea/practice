var fs=require('fs');
fs.realpath('./message.txt',function(err,resolvedPath) {
    if (err) throw err;
    console.log(resolvedPath);
});






