var readline = require('readline');
var fs=require('fs');
var file = fs.createReadStream('./message.txt');
var rl = readline.createInterface({
    input: file,
    output:process.stdout,
    terminal:true
});
file.on('end',function(){
    var buf=new Buffer("文件读取时间："+(new Date()).toLocaleString());
    rl.write("\r\n");
    rl.write(buf); 
    //rl.write(buf,{ctrl:true,name:'u'});
});






