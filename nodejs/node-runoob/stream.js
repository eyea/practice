var fs = require('fs');
var data = '';

// 处理流事件  data  end  error

var readerSteam = fs.createReadStream('input.txt');

readerSteam.setEncoding('UTF8');

readerSteam.on('data', function(chunk){
  data += chunk;
});


readerSteam.on('end', function(){
  console.log(data);
});

readerSteam.on('error', function(){
 console.log(err.stack);
});

console.log('程序执行完毕!')








