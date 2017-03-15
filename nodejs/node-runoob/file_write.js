var fs = require('fs');

console.log('准备写入...');

fs.writeFile('input.txt','我是通过写入的文件内容', function(err){
  if(err){
   return console.error(err)
 }
console.log('数据写入成功');
console.log('-----分割线-----');
console.log('读取写入数据的文件内容')
fs.readFile('input.txt', function(err, data){
 if(err){
   return console.error(err)
 }
 console.log('异步读取文件数据 '+ data.toString())
});
});
