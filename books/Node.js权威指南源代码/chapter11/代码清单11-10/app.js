var zlib=require('zlib');
var fs=require('fs');
var out=fs.createWriteStream('compress.log');
var input = 'abcdefghijklmnopqrstuvwxyz';
zlib.gzip(input,function(err,buffer) {
    if (!err) {
        zlib.unzip(buffer,function(err,buffer) {
            if (!err) {
                console.log(buffer.toString());
                out.write(buffer.toString());
             }
        });
    }
});



    








