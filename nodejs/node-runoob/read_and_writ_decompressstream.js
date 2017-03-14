var fs = require('fs');
var zlib = require('zlib');

// 解压input.txt.gz 文件为input2.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input2.txt'));

console.log('文件解压完成，ls下是否存在input2.txt呢')
