var zlib=require('zlib');
var gunzip = zlib.createGunzip();
var fs = require('fs');
var inp = fs.createReadStream('test.txt.gz');
var out = fs.createWriteStream('test.txt');
inp.pipe(gunzip).pipe(out);




    








