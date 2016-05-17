var fs=require('fs');
var finish=function() {
    console.log('文件读取完毕。');
}
process.nextTick(finish);
var data=fs.readFileSync('./app.js');
console.log(data.toString());