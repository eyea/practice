var fs=require('fs');
var time = process.hrtime();
var data=fs.readFileSync('./app.js');
var diff = process.hrtime(time);
console.log('读文件操作耗费%d纳秒。', diff[0] * 1e9 + diff[1]);


