var fs = require('fs');

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取input内的文件内容，然后把读取到的内容写入到output文件中

readerStream.pipe(writerStream);

console.log('读写完成，请检查输出文件内容!')
